module.exports.createPie = (divId, title, dataSet) => {
    var pie = new d3pie(divId, {
      "header": {
        "title": {
          "text": title,
          "fontSize": 24,
          "font": "open sans"
        },
        "subtitle": {
          "color": "#999999",
          "fontSize": 12,
          "font": "open sans"
        },
        "location": "pie-center",
        "titleSubtitlePadding": 9
      },
      "footer": {
        "color": "#999999",
        "fontSize": 10,
        "font": "open sans",
        "location": "bottom-left"
      },
      "size": {
        "pieInnerRadius": "50%",
        "pieOuterRadius": "70%"
      },
      "data": {
        "sortOrder": "value-desc",
        "content": dataSet
      },
      "labels": {
        "outer": {
          "format": "label-value1",
          "pieDistance": 32
        },
        "inner": {
          "hideWhenLessThanPercentage": 3
        },
        "mainLabel": {
          "fontSize": 11
        },
        "percentage": {
          "color": "#ffffff",
          "decimalPlaces": 0
        },
        "value": {
          "color": "#adadad",
          "fontSize": 11
        },
        "lines": {
          "enabled": true
        },
        "truncation": {
          "enabled": true
        }
      },
      "tooltips": {
        "enabled": true,
        "type": "placeholder",
        "string": "{label}: {percentage}%",
        "styles": {
          "fadeInSpeed": 348
        }
      },
      "effects": {
        "pullOutSegmentOnClick": {
          "speed": 400,
          "size": 8
        }
      },
      "misc": {
        "gradient": {
          "enabled": true,
          "percentage": 100
        }
      },
      "callbacks": {}
    });
  }