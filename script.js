
function formatCompact(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1).replace(/\.0$/, "") + "K";
  return String(n);
}

const state = {
  name: "Victor Crest",
  age: 26,
  location: "London",
  followers: 60000,
  likes: 803000,
  photos: 1400,
  following: false
};

function render() {
  document.getElementById("name").innerHTML = `${state.name} <small>${state.age}</small>`;
  document.getElementById("location").textContent = state.location;
  document.getElementById("followers").textContent = formatCompact(state.followers);
  document.getElementById("likes").textContent = formatCompact(state.likes);
  document.getElementById("photos").textContent = formatCompact(state.photos);

  const btn = document.getElementById("followBtn");
  btn.textContent = state.following ? "Following" : "Follow";
  btn.setAttribute("aria-pressed", state.following);
}

function toggleFollow() {
  const before = state.followers;
  state.following = !state.following;
  state.followers += state.following ? 1 : -1;
  animateNumber("followers", before, state.followers, 400);
  render();
}


function animateNumber(id, from, to, duration) {
  const el = document.getElementById(id);
  const start = performance.now();

  function step(now) {
    const t = Math.min(1, (now - start) / duration);
    const val = Math.round(from + (to - from) * t);
    el.textContent = formatCompact(val);
    if (t < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}


function messageUser() {
  const msg = prompt(`Send a message to ${state.name}:`, `Hi ${state.name}!`);
  if (msg) alert(`Message sent: "${msg}"`);
}


document.getElementById("avatar").addEventListener("click", () => {
  const el = document.getElementById("avatar");
  el.textContent = Math.random() > 0.5 ? "VC" : "V";
  el.style.background = "linear-gradient(180deg,#cfd9ff,#99a9ff)";
});

document.getElementById("followBtn").addEventListener("click", toggleFollow);
document.getElementById("messageBtn").addEventListener("click", messageUser);

render();
