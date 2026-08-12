export default {
  fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/proposal/iceage") {
      url.pathname = "/proposal/iceage/index.html";
      return env.ASSETS.fetch(new Request(url, request));
    }

    return env.ASSETS.fetch(request);
  }
};
