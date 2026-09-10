"""Reproduce 2024 on-road finishes, distinct from official classification. Offline."""
import csv
import json
from pathlib import Path

P = Path(__file__).resolve().parent
TOP10 = [1, 4, 16, 81, 55, 63, 44, 11, 14, 10]
drivers = {}
races = []
audit = []
for round_no, race in enumerate(json.loads((P / 'official-2024.json').read_text()), 1):
    starts = finishes = 0
    for row in race['rows'][1:]:
        _, number, name, _, _, status, _ = row
        number = int(number)
        started = status != 'DNS'
        finished = started and status not in ('DNF', 'DSQ')
        note = ''
        if (round_no, number) == (11, 4):
            finished = False
            note = 'Norris retired in Austria despite +7 laps classification; FIA race report.'
        if (round_no, number) == (14, 63):
            finished = True
            note = 'Russell finished in Belgium before post-race disqualification; F1 race report.'
        if (round_no, number) == (21, 27):
            note = 'Hulkenberg received black flag during Brazil race; not an on-road finish.'
        d = drivers.setdefault(number, dict(number=number, driver=name, starts=0, finishes=0))
        d['starts'] += started
        d['finishes'] += finished
        starts += started
        finishes += finished
        audit.append(dict(round=round_no, number=number, driver=name, raw_status=status,
                          started=int(started), on_road_finish=int(finished), note=note,
                          source=race['url']))
    races.append(dict(round=round_no, race=race['url'].split('/')[-2], starts=starts,
                      on_road_finishes=finishes, source=race['url']))
top = []
for rank, number in enumerate(TOP10, 1):
    d = dict(rank=rank, **drivers[number])
    d['nonfinishes'] = d['starts'] - d['finishes']
    d['finish_percent'] = round(100 * d['finishes'] / d['starts'], 4)
    top.append(d)
summary = dict(year=2024, grands_prix=len(races), starts=sum(r['starts'] for r in races),
               on_road_finishes=sum(r['on_road_finishes'] for r in races),
               minimum_race_finishers=min(r['on_road_finishes'] for r in races),
               zero_finisher_races=sum(r['on_road_finishes'] == 0 for r in races),
               top10_starts=sum(d['starts'] for d in top),
               top10_finishes=sum(d['finishes'] for d in top))
summary['top10_pooled_nonfinish_percent'] = 100 * (1 - summary['top10_finishes'] / summary['top10_starts'])
summary['top10_mean_driver_nonfinish_percent'] = sum(100 * d['nonfinishes'] / d['starts'] for d in top) / 10
for name, rows in [('continuity-races-2024.csv', races), ('continuity-drivers-top10-2024.csv', top),
                   ('continuity-audit-2024.csv', audit)]:
    with (P / name).open('w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=rows[0].keys())
        w.writeheader()
        w.writerows(rows)
assert (summary['starts'], summary['on_road_finishes']) == (476, 425)
assert (summary['top10_starts'], summary['top10_finishes']) == (238, 219)
assert summary['minimum_race_finishers'] == 15
(P / 'continuity-summary-2024.json').write_text(json.dumps(summary, indent=2) + '\n')
print(json.dumps(summary, indent=2))
