import React, { useMemo } from 'react';
import WebView from './components/webView';

const PowerBIEmbed = (props) => {


  const html = useMemo(() => {
    let embedConfiguration = {
      type: 'report',
      tokenType: 1,
      accessToken: props.accessToken,
      embedUrl: props.embedUrl,
      id: props.id,
      settings: {
        filterPaneEnabled: false,
        navContentPaneEnabled: false,
        layoutType: 2,
      },
    };
    if (('language' in props)) {
      embedConfiguration.settings.localeSettings = {
        language: props.language,
        formatLocale: props.language,
      };
    }

    if (('embedConfiguration' in props)) {
      embedConfiguration = {...embedConfiguration, ...props?.embedConfiguration}
    }

    const stringConfiguration = JSON.stringify(embedConfiguration)
  
    return (`<!doctype html>
    <html>
    <head>
        <meta charset="utf-8" />
        <script src="https://cdn.jsdelivr.net/npm/powerbi-client@2.4.7/dist/powerbi.min.js"></script>
        <style>
            html,
            body,
            #reportContainer {
                width: 100%;
                height: 100%;
                margin: 0;
                background-color: 'white';
                -webkit-overflow-scrolling: touch;
            }
            iframe {
                border: 0px
            }
        </style>
    </head>
    
    <body>
        <div id="reportContainer"></div>
        <script>
        var models = window['powerbi-client'].models;
        var config = ${stringConfiguration};
        var reportContainer = document.getElementById('reportContainer');
        var report = powerbi.embed(reportContainer, config);
        </script>
    </body>
    </html>`
  )
  },[props.embedConfiguration])

    return (
      <WebView source={{ html }} />
    );
}

export default PowerBIEmbed