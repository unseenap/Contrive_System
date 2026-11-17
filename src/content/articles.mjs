const articles = [
  ['Choosing an MCC panel', 'mcc', 'Start with the motor list, rated current and starting method for each load. Include feeder protection, control voltage, spare capacity and access requirements in your brief. A single-line diagram helps establish how the MCC connects to upstream and downstream equipment.'],
  ['What an APFC panel does', 'apfc', 'An APFC controller brings capacitor stages in and out as reactive demand changes. A useful enquiry includes site load patterns, measured power factor and information about harmonic-producing loads, such as variable frequency drives.'],
  ['Preparing a panel enquiry', 'switchgear', 'Share the intended application, supply voltage, load schedule and site conditions. If available, include a single-line diagram, enclosure requirements, preferred components and the project delivery schedule.'],
];

const postLink = (index) => ['choosing-an-mcc-panel.html', 'what-an-apfc-panel-does.html', 'preparing-a-panel-enquiry.html'][index];

export { articles, postLink };
