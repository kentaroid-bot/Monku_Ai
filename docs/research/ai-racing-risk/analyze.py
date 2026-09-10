"""Reproduce descriptive counts from the saved official F1 result tables. No network."""
import csv,json
from pathlib import Path
P=Path(__file__).resolve().parent
CAUSE={2:{18:'incident'},3:{63:'incident'},4:{3:'incident',23:'incident'},5:{3:'incident',22:'incident'},6:{2:'incident'},8:{31:'incident',11:'incident',27:'incident',20:'incident'},9:{55:'incident',23:'incident',11:'incident',2:'incident'},11:{4:'incident'},16:{22:'incident'},17:{11:'incident',55:'incident',22:'incident'},18:{20:'incident'},19:{44:'incident'},20:{23:'incident',22:'incident'},21:{55:'incident',43:'incident'},23:{27:'incident',43:'incident',31:'incident',11:'mixed',18:'mixed'},24:{77:'incident',11:'incident'}}
slugs=json.loads((P/'fia-urls.json').read_text())
slugs['20']='f1-sainz-takes-mexico-city-win-ahead-norris-and-leclerc-verstappen-finishes-sixth-after'
extras={16:'https://www.formula1.com/en/latest/article/great-shame-for-tsunoda-as-he-endures-back-to-back-dnfs-and-rues-unnecessary.7qbXFxDaosgh1mSt0ZK1eV',18:'https://www.haasf1team.com/news/singapore-grand-prix-race-recap-5',19:'https://www.mercedesamgf1.com/reports/strong-recovery-for-george-at-the-united-states-gp-in-austin',23:'https://www.astonmartinf1.com/en-GB/news/on-track/the-debrief-by-aramco-qatar-grand-prix'}
summary=[];audit=[];races=[]
for year in [2014,2024]:
 data=json.loads((P/f'official-{year}.json').read_text());starts=raw=ret=incident=mixed=incident_races=0
 for rnd,race in enumerate(data,1):
  rows=race['rows'][1:];assert all(len(r)==7 for r in rows)
  n=sum(r[5]!='DNS' for r in rows);starts+=n;inc=0;rr=0
  for r in rows:
   number=int(r[1]);isret=r[5]=='DNF';raw+=isret;note=''
   if (year,rnd,number)==(2014,15,11):isret=False;note='F1 contemporary report says Perez finished tenth; override DNF label.'
   if (year,rnd,number)==(2024,11,4):isret=True;note='FIA report confirms Norris retired following collision; override +7 laps label.'
   cat=CAUSE.get(rnd,{}).get(number,'technical_or_other') if year==2024 and isret else ''
   if isret:ret+=1;rr+=1
   if cat=='incident':incident+=1;inc+=1
   if cat=='mixed':mixed+=1
   if isret or note:
    audit.append(dict(year=year,round=rnd,number=number,driver=r[2],raw_status=r[5],counted_retirement=int(isret),category=cat,result_url=race['url'],cause_source=('https://www.fia.com/news/'+slugs[str(rnd)]) if year==2024 and str(rnd) in slugs else '',additional_source=extras.get(rnd,'') if year==2024 else '',note=note))
  incident_races+=inc>0
  races.append(dict(year=year,round=rnd,race=race['url'].split('/')[-2],starts=n,retirements=rr,confirmed_incident_retirements=inc if year==2024 else '',result_url=race['url']))
 summary.append(dict(year=year,races=len(data),starts=starts,raw_dnf=raw,corrected_retirements=ret,retirement_rate=ret/starts,confirmed_incident_retirements=incident if year==2024 else None,mixed_cause_retirements=mixed if year==2024 else None,races_with_confirmed_incident_retirement=incident_races if year==2024 else None))
for name,rows in [('retirement-audit.csv',audit),('race-counts.csv',races)]:
 with (P/name).open('w',newline='') as f:w=csv.DictWriter(f,fieldnames=rows[0].keys());w.writeheader();w.writerows(rows)
(P/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n')
assert [(s['starts'],s['corrected_retirements']) for s in summary]==[(404,84),(476,50)]
assert summary[1]['confirmed_incident_retirements']==31
assert summary[1]['mixed_cause_retirements']==2
print(json.dumps(summary,indent=2))
