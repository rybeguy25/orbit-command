'use strict';

const destinations = {
  kepler: { name: 'Kepler-186f', code: 'K / 186F', classification: 'Terrestrial exoplanet', transit: 186, colors: '#a8bc83,#5b886d,#263f3e' },
  titan: { name: 'Titan', code: 'T / 006', classification: 'Methane world', transit: 42, colors: '#efd3a0,#b77c39,#503329' },
  europa: { name: 'Europa', code: 'E / 002', classification: 'Ocean beneath ice', transit: 31, colors: '#e1edf1,#9faebc,#475b70' },
  proxima: { name: 'Proxima b', code: 'P / 001', classification: 'Red-dwarf companion', transit: 284, colors: '#dfb3d7,#886687,#3e334d' },
};
const element = id => document.getElementById(id);
let expeditionTimer = null;
let expeditionCount = 0;
let progress = 0;
let selectedDestination = destinations.kepler;
let telemetryTick = 0;
let orbitsPaused = false;

function utcTime() {
  return new Date().toLocaleTimeString('en-GB', { timeZone: 'UTC', hour12: false });
}

function log(message) {
  const row = document.createElement('li');
  const time = document.createElement('time');
  time.dateTime = new Date().toISOString();
  time.textContent = utcTime();
  const marker = document.createElement('span');
  marker.className = 'log-marker';
  marker.textContent = '›';
  const text = document.createElement('span');
  text.textContent = message;
  row.append(time, marker, text);
  element('transmissions').prepend(row);
  while (element('transmissions').children.length > 5) {
    element('transmissions').lastElementChild.remove();
  }
}

function updateDestination() {
  selectedDestination = destinations[element('destination').value];
  element('classification').textContent = selectedDestination.classification;
  element('transit').textContent = `${selectedDestination.transit} simulation days`;
  element('destination-code').textContent = selectedDestination.code;
  element('manifest-destination').textContent = selectedDestination.name;
  element('map-destination').textContent = `TARGET: ${selectedDestination.name.toUpperCase()}`;
  const colors = selectedDestination.colors.split(',');
  element('destination-planet').style.background = `radial-gradient(circle at 30% 26%, ${colors[0]} 0%, ${colors[1]} 25%, ${colors[2]} 57%, #070d12 80%)`;
  progress = 0;
  element('progress-fill').style.width = '0%';
  element('progress-text').textContent = '0%';
  element('phase').textContent = 'AWAITING YOUR COMMAND';
  element('vessel-status').textContent = 'STANDBY';
  element('launch').firstChild.textContent = 'INITIATE EXPEDITION ';
  log(`Flight plan updated. Destination: ${selectedDestination.name}. Snacks: insufficient.`);
}

function launch() {
  if (expeditionTimer !== null) return;
  progress = 0;
  expeditionCount += 1;
  element('launch').disabled = true;
  element('destination').disabled = true;
  element('launch').firstChild.textContent = 'EXPEDITION IN PROGRESS ';
  element('vessel-status').textContent = 'DEPARTING';
  element('phase').textContent = 'PREPARING ION DRIVE';
  log(`Expedition ${String(expeditionCount).padStart(2, '0')}: departure for ${selectedDestination.name} authorized.`);
  expeditionTimer = setInterval(() => {
    progress = Math.min(100, progress + 2);
    element('progress-fill').style.width = `${progress}%`;
    element('progress-text').textContent = `${progress}%`;
    if (progress === 20) {
      element('phase').textContent = 'CLEARING THE LAUNCH CORRIDOR';
      log('Launch corridor clear. The void has declined to comment.');
    }
    if (progress === 50) {
      element('phase').textContent = 'CRUISING INTO THE UNKNOWN';
      element('vessel-status').textContent = 'IN TRANSIT';
      element('map-destination').textContent = `EN ROUTE TO ${selectedDestination.name.toUpperCase()}`;
      log('Cruise velocity achieved. Artificial gravity: emotionally supportive.');
    }
    if (progress === 80) element('phase').textContent = 'ESTABLISHING ORBITAL INSERTION';
    if (progress === 100) {
      clearInterval(expeditionTimer);
      expeditionTimer = null;
      element('phase').textContent = 'EXPEDITION COMPLETE';
      element('vessel-status').textContent = 'ARRIVED';
      element('map-destination').textContent = `IN ORBIT: ${selectedDestination.name.toUpperCase()}`;
      element('launch').disabled = false;
      element('destination').disabled = false;
      element('launch').firstChild.textContent = 'LAUNCH ANOTHER EXPEDITION ';
      log(`Arrival confirmed at ${selectedDestination.name}. We brought a flag. Forgot a pen.`);
    }
  }, 180);
}

function tick() {
  element('clock').textContent = `${utcTime()} UTC`;
  if (document.hidden) return;
  telemetryTick += 1;
  const signal = (98.6 + Math.sin(telemetryTick / 9) * 0.3).toFixed(1);
  const distance = (12.84 + telemetryTick * 0.00005 + expeditionCount * 0.01).toFixed(2);
  const velocity = Math.round(28420 + Math.sin(telemetryTick / 12) * 130);
  element('signal').replaceChildren(document.createTextNode(signal), unit('%'));
  element('distance').replaceChildren(document.createTextNode(distance), unit('AU'));
  element('velocity').textContent = velocity.toLocaleString('en-US');
}

function unit(label) {
  const span = document.createElement('span');
  span.textContent = label;
  return span;
}

element('destination').addEventListener('change', updateDestination);
element('launch').addEventListener('click', launch);
element('pause-orbits').addEventListener('click', () => {
  orbitsPaused = !orbitsPaused;
  document.querySelector('.orbital-map').classList.toggle('paused', orbitsPaused);
  element('pause-orbits').setAttribute('aria-pressed', String(orbitsPaused));
  element('pause-orbits').textContent = orbitsPaused ? 'RESUME ORBITS ▷' : 'PAUSE ORBITS Ⅱ';
});
element('clear-log').addEventListener('click', () => {
  element('transmissions').replaceChildren();
  log('Transmission buffer cleared. Space remembers, though.');
});
document.querySelectorAll('.rail-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.rail-link').forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  });
});
log('Deep-space relay established. All data is fictional. Ambition is not.');
log('Four vessels reporting nominal. Still Here is still looking for the Wi-Fi.');
tick();
setInterval(tick, 1000);
