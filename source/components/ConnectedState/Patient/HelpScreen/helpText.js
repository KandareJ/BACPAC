
export const help = [
  {
    title: "Syncing Data",
    content: `Tapping the 'Sync' button in the 'BACPAC Device' screen will pull the most recent data from the BACPAC device over bluetooth. This may take a few minutes to complete. Syncing does not require an internet connection and will not use any data.`,
    icon: require('../../../../../assets/icons/sync.png')
  },
  {
    title: "Finishing your Test",
    content: `After syncing your data, the 'Push' button appears in place of the 'Sync' button. Pushing will send your data to us to be analyzed. Pushing does require an internet connection and will use celular data if the phone is not connected to a wifi network.`,
    icon: require('../../../../../assets/icons/cloud_upload.png')
  },
  {
    title: "Device Storage",
    content: `If your BACPAC device is running low on storage, syncing it with your phone by tapping the 'sync' button in the 'BACPAC Device' screen will clear some space up.`,
    icon: require('../../../../../assets/icons/sd_card.png')
  },
  {
    title: "Battery Life",
    content: `If your BACPAC device is running low on battery, charge it before continuing with the test.`,
    icon: require('../../../../../assets/icons/battery.png')
  },
  {
    title: "Report an Issue",
    content: `Please report any issues that you may be having with this App or with the BACPAC device. To report an issue, select the 'Report Issue' option from the side menu.`,
    icon: require('../../../../../assets/icons/report.png')
  },
];
