var funcs = require('./funcs');

var gotIP = function(error, ip) {
 console.log("IP address is " + ip);
}
funcs.getNetworkIPs(gotIP, false);

var options = funcs.getLatestDownloads.options;
//funcs.getLatestDownloads.options.path = 'http://' + options.host + options.path;
//funcs.getLatestDownloads.options.host = 'wwwgate.ti.com';
var gotDownload = function(download) {
 console.log("Download available at " + download);
}
funcs.getLatestDownloads(gotDownload);

var mdns = require('mdns');
var mdnsServiceUp = function(service) {
 if(service.host && service.host.match(/beagle/i)) {
  console.log('Found ' + service.name + ' at ' +
  service.host.replace(/\.$/, '') +
  ' ' + service.type.name + '://' +
  service.addresses[0] +
  ':' + service.port);
 }
};
var mdnsServiceDown = function(service) {
};
mdns.createBrowser(mdns.tcp('https'))
 .on('serviceUp', mdnsServiceUp)
 .on('serviceDown', mdnsServiceDown)
 .start();
mdns.createBrowser(mdns.tcp('tcp'))
 .on('serviceUp', mdnsServiceUp)
 .on('serviceDown', mdnsServiceDown)
 .start();
mdns.createBrowser(mdns.tcp('http'))
 .on('serviceUp', mdnsServiceUp)
 .on('serviceDown', mdnsServiceDown)
 .start();
