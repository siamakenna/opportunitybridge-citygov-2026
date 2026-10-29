// Test-only preload. Normal index/evaluation pages never include this script.
// Historical interface assertions require the original reviewed-source clock.
(()=>{const NativeDate=window.Date,stamp=NativeDate.parse('2026-10-27T12:00:00Z');class RehearsalDate extends NativeDate{constructor(...args){super(...(args.length?args:[stamp]));}static now(){return stamp;}}window.Date=RehearsalDate;document.documentElement.dataset.softwareRehearsal='frozen-clock';})();
