const products = [
  ['amf', 'Auto Mains Failure Panel', 'Automatically manages the transition between mains power and a standby generator.'],
  ['apfc', 'Automatic Power Factor Correction (APFC) Panel', 'Switches capacitor stages in response to changing reactive power demand.'],
  ['changeover', 'Auto Change Over Panel', 'Transfers a load between two available electrical sources.'],
  ['hvac', 'HVAC Panels', 'Centralizes control and protection for air-handling, ventilation and cooling equipment.'],
  ['mcc', 'Motor Control Center', 'Groups motor feeders, starters and protective devices in one assembly.'],
  ['pcc', 'Power Control Centre', 'Consolidates incoming supply, metering and outgoing feeders for low-voltage power distribution.'],
  ['distribution', 'Power Distribution Board', 'Distributes electrical power to branch circuits with individually protected outgoing ways.'],
  ['vfd', 'VFD Panels', 'Houses variable frequency drives for applications that need adjustable motor speed.'],
  ['rising-main', 'Air Insulated Rising Main', 'Routes electrical power vertically through a building using enclosed busbars.'],
  ['dol', 'DOL Panels', 'Starts compatible motors directly across the supply using a contactor and overload protection.'],
  ['control-desk', 'Control Desk', 'Brings process controls, instruments and status displays to an operator station.'],
  ['feeder-pillar', 'Feeder Pillar', 'Provides a local distribution point for multiple outgoing circuits.'],
  ['instrumentation', 'Instrumentation Panel', 'Groups field signal interfaces, indicating instruments and monitoring devices.'],
  ['main-lt', 'Main LT Panels', 'Receives and distributes low-voltage power at the main electrical intake.'],
  ['plc', 'PLC Panel', 'Houses programmable logic controllers, input and output modules, and associated power supplies.'],
  ['star-delta', 'Star Delta Panel', 'Reduces starting current for compatible three-phase motors using staged switching.'],
  ['ht', 'HT Panels', 'Switches and protects incoming high-tension circuits in suitable distribution systems.'],
  ['lt', 'LT Panels', 'Controls and distributes low-tension electrical power across downstream loads.'],
  ['bus-duct', 'Bus Duct & Accessories', 'Carries power through enclosed rigid conductors between equipment or distribution points.'],
  ['meter-board', 'Meter Board', 'Groups meters and associated connections for centralized energy monitoring.'],
  ['thyristor', 'Thyristor Switching Panel', 'Uses solid-state switching for applications that need rapid switching response.'],
  ['cable-tray', 'Cable Tray & Accessories', 'Supports and organizes electrical cable runs through a facility.'],
  ['smart', 'Smart Panels', 'Combines power distribution with status monitoring and communication options.'],
  ['pcc-panel', 'PCC Panel', 'Configures a low-voltage power control assembly around the incoming sources, bus coupler and outgoing feeder schedule.'],
  ['distribution-panel', 'Distribution Panel', 'Feeds downstream circuits in a single assembly with protection and isolation for each outgoing load.'],
  ['mcc-panel', 'MCC Panel', 'Coordinates motor starters, local and remote controls, and overload protection for a group of motors.'],
  ['drive', 'Drive Panel', 'Integrates drive controls and protective devices for motor-driven machinery.'],
];

const productNavigation = [
  'apfc', 'amf', 'changeover', 'rising-main', 'dol', 'control-desk',
  'feeder-pillar', 'hvac', 'instrumentation', 'main-lt', 'mcc', 'plc',
  'distribution', 'pcc', 'star-delta', 'vfd', 'ht', 'lt', 'bus-duct',
  'meter-board', 'thyristor', 'cable-tray', 'smart', 'pcc-panel',
  'control-desk', 'drive', 'distribution-panel', ['plc', 'PLC Pane'], 'mcc-panel',
].map((entry) => Array.isArray(entry) ? entry : [entry]);
const productLookup = new Map(products.map((product) => [product[0], product]));
const productIds = [...new Set(productNavigation.map(([id]) => id))];
if (productIds.length !== products.length || productIds.some((id) => !productLookup.has(id))) {
  throw new Error('The product navigation must include every product.');
}
const catalogueProducts = productIds.map((id) => productLookup.get(id));
const productRequirements = {
  amf: 'Generator start interface, changeover sequence and return-to-mains delay',
  apfc: 'Existing power factor, target power factor and harmonic-producing loads',
  changeover: 'Source ratings, transfer method and manual override requirements',
  hvac: 'Equipment list, operating sequences and building management system interface',
  mcc: 'Motor list, starter types and local or remote operating requirements',
  pcc: 'Single-line diagram, incomer ratings and outgoing feeder schedule',
  distribution: 'Circuit schedule, pole counts and labels for outgoing ways',
  vfd: 'Motor nameplate data, speed range and cable length between the drive and motor',
  'rising-main': 'Building levels, riser route and tap-off positions',
  dol: 'Motor full-load current, duty cycle and control supply voltage',
  'control-desk': 'Operator layout, controls, displays and emergency stop locations',
  'feeder-pillar': 'Feeder schedule, cable entry and outdoor site conditions',
  instrumentation: 'Instrument list, signal types and termination schedule',
  'main-lt': 'Transformer capacity, incoming feeders and short-circuit level',
  plc: 'I/O count, controller family and industrial communication network',
  'star-delta': 'Motor terminal arrangement, starting duty and changeover timing',
  ht: 'System voltage, fault level, protection scheme and utility requirements',
  lt: 'Incomer and outgoing load ratings, metering and available footprint',
  'bus-duct': 'Route drawing, conductor arrangement, joints and termination points',
  'meter-board': 'Meter quantities, connection types and communications requirements',
  thyristor: 'Load type, switching frequency and cooling conditions',
  'cable-tray': 'Cable schedule, route, supporting span and material requirements',
  smart: 'Measurements, alarm points and integration protocol',
  'pcc-panel': 'Incomer and bus coupler arrangement, interlocks and distribution schedule',
  drive: 'Drive duty, braking requirements, ventilation and control interface',
  'distribution-panel': 'Incoming supply, branch circuits and location of cable entries',
  'mcc-panel': 'Feeder configuration, control voltage and overload protection',
};
const relatedImages = {
  'pcc-panel': 'pcc', 'distribution-panel': 'distribution', 'mcc-panel': 'mcc', drive: 'vfd',
};
const featuredProducts = new Set(products.slice(0, 8).map(([id]) => id));
const productImage = (id) => featuredProducts.has(id) ? id : relatedImages[id] ?? 'switchgear';

export { products, productNavigation, productLookup, catalogueProducts, productRequirements, productImage };
