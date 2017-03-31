var time_index = 0;
var time_lines = ["last_12_months","quarterly","monthly","weekly","today"]
var scroll_interval;
function __$(id) {
    return document.getElementById(id);
}

function resize() {

    if (__$("main")) {
        __$("scroll").style.height = (window.innerHeight - 80) + "px";    
        __$("main").style.height = (window.innerHeight - 0) + "px";

    }

}

function array_sum(array){
    var sum = 0 ;
    for(var key in array){
        sum = sum + array[key];
    }
    return sum;
}
var district_data ={}
$.getJSON('/district_and_code',function(data){
      district_data = data;
      var left_table = $("#left_body");
      left_table.empty();

      var distrist_keys = Object.keys(data).sort();

      for (var i = 0 ; i <distrist_keys.length ; i++){
            var tr = document.createElement("tr");
            left_table.append(tr);

            var td = document.createElement("td");
            td.innerHTML = distrist_keys[i];
            td.style.width="14.545%";
            td.style.paddingLeft ="2%";
            td.style.fontWeight ="bold";
            tr.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = "";
            td.id = data[distrist_keys[i]]+"_line_graph";
            td.style.width='20%';
            td.style.textAlign  ="center";
            tr.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = ""
            td.style.paddingRight ="0.8em";
            td.id = data[distrist_keys[i]]+"_reported"
            td.style.textAlign ="right";
            td.style.width='12.72%';
            tr.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = "";
            td.style.textAlign ="right";
            td.id = data[distrist_keys[i]]+"_registered"
            td.style.paddingRight ="0.8em";
            td.style.width='12.72%';
            tr.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = "";
            td.id = data[distrist_keys[i]]+"_avg_time"
            td.style.textAlign ="right";
            td.style.paddingRight ="1em";
            td.style.width='15%';
            tr.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = "";
            td.id = data[distrist_keys[i]]+"_bar_graph";
            td.style.paddingLeft = "1em";
            td.style.width='27.27%'
            tr.appendChild(td);

      }
});

/* HighChart Function**/
function drawMiniGraph(id, reported, registered){
   $("#"+id).highcharts({
        chart:{
            spacingBottom: 0,
            spacingTop: 0,
            spacingLeft: 0,
            spacingRight: 0,
            width: 150,
            height: 45
        },
        title: {
            text: ''
            //center
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            labels: {
                     enabled: false
            },
            title:{
                    enabled:false
            },
            axis:{
                    enabled:false
            }

        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
             labels: {
                     enabled: false
            },
            title:{
                    enabled:false
            },
            axis:{
                    enabled:false
            }
            ,
            min: 0
        },
        legend: {
            enabled:false
        }
         ,
        tooltip: {
            enabled: false
        }
        ,
        series: [{
            name: 'Reported',

            color : '#729fcf',
            data: registered
        } ]
    });

}
function drawReportToRegisterChart(id,registered,reported){

        $(function () {
                var percent_registered = (registered/reported) * 100;
                $("#"+id).highcharts({

                    chart:{
                        type:"bar",
                        spacingBottom: 0,
                        spacingTop: 0,
                        spacingLeft: 0,
                        spacingRight: 0,
                        width: 150,
                        height: 45,
                        margin: [0, 0, 0, 0]

                    },
                    title: {
                            text: ''
                    }
                    ,
                    xAxis:{
                          labels: {
                            enabled: false
                        }
                    },
                    yAxis:{
                        labels: {
                            enabled: false
                        },
                        title:{
                            enabled:false
                        },
                        axis:{
                            enabled:false
                        },
                        min: 0,
                        max: 100

                    },

                    legend: {
                                enabled: false
                     }
                    ,

                    tooltip: {
                            enabled: false
                    },
                    plotOptions: {
                            bar: {
                                grouping: false,
                                shadow: false,
                                borderWidth: 0
                            }
                        }
                    ,
                     series: [{
                                    name: 'reported ',
                                    color: '#cfe7f8',
                                    data: [100],
                                    pointPadding: -0.09
                                },
                                {
                                    name: 'registered',
                                    color:'#729fcf',
                                    data : [percent_registered],
                                    pointPadding: 0.25
                                }
                            ]

                });
        });
    }

    function drawPieChart(pieData){

            // Make monochrome colors and set them as default for all pies
            Highcharts.getOptions().plotOptions.pie.colors = (function () {
                var colors = ['#00004d', '#000099', '#070d13', '#1a324c', '#346498', '#6797cb', '#b3cbe5', '#ccccff', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#395C9B', '#923532', '#7B972E', '#6A538D', '#3B83A1', '#CB7221', '#F2E200'],
                    base = Highcharts.getOptions().colors[0],
                    i;

                for (i = 0; i < 10; i += 1) {
                    // Start out with a darkened base color (negative brighten), and end
                    // up with a much brighter color
                    colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
                }
                return colors;
            }());

            // Build the chart
            $('#piechart').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: '<font style="color:#004586;font-size:0.9em;font-weight:bold">National Total Reported</font>',
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>:<br> {point.percentage:.1f} %',
                            style: {
                                color:[ (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black']
                            }
                        }
                    }
                },
                series: [{
                    name: "National reported",
                    data: interPieData(pieData)
                }]
            });

}
 function drawbarchart(container,percent){
    //var container = '#container';
                $(function () {
                $(container).highcharts({
                    chart: {
                        type: 'bar',
                        spacingBottom: 0,
                        spacingTop: 0,
                        spacingLeft: 0,
                        spacingRight: 0,
                        margin:[0,0,0,0],
                        width: null,
                        height: 20
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        //categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania']
                        labels: {
                            enabled: false
                        }

                    },
                    yAxis: {
                        min: 0,
                        labels: {
                            enabled: false
                        },
                        title:{
                            enabled:false
                        },
                        axis:{
                            enabled:false
                        },
                        min: 0,
                        max: 100

                    },
                    legend: {
                                enabled: false
                     }
                    ,
                    tooltip: {
                        enabled: false
                    },
                    series: [{
                        name: 'reported',
                        colors: '#729fcf',
                        data: [percent],
                        pointPadding: -3,

                    }]
                });
            });
}

var position = 0;

var direction = 1;

function scrollingTable(){
      var step = 4;
      var cycle = 1;
      scroll_interval = setInterval(function() {

          if(__$("scroll")) {

              if(direction == 1) {
                  if(cycle==2){
                           clearInterval(scroll_interval);
                           time_index = (time_index + 1) % 5;
                           pullData();
                           //location.reload(true);
                          //$(location).attr("href", "/dashboard/map_dashboard");

                  }
                  position += step;

                  if((position * 1.7) > __$("scroll").scrollHeight) {

                      direction = 0;
                      cycle = 1;
                      
                  }

              } else if(direction == 0) {

                  

                  position -= step;

                  if(position < 0) {

                      direction = 1;
                      cycle = 2
                      
                  }

              }

              __$("scroll").scrollTop = position;

          }

      }, 100);
}

function drawRightChart(monthly,yearly){
            aggregates("#monthly_reported", monthly['reported'], monthly['reported']);
            aggregates("#annual_reported", yearly['reported'], yearly['reported']);

            aggregates("#monthly_registered", monthly['registered'], monthly['reported']);
            aggregates("#annual_registered", yearly['registered'], yearly['reported']);

            aggregates("#monthly_printed",monthly['printed'],monthly['reported']);
            aggregates("#annual_printed",yearly['printed'],yearly['reported']);

            aggregates("#monthly_verified",monthly['verified'], monthly['reported']);
            aggregates("#annual_verified",yearly['verified'],yearly['reported']);

            aggregates("#monthly_re_printed",monthly['reprinted'], monthly['reported']);
            aggregates("#annual_re_printed",yearly['reprinted'],yearly['reported']);

            aggregates("#monthly_incomplete",monthly['incompleted'],  monthly['reported']);
            aggregates("#annual_incomplete",yearly['incompleted'],yearly['reported']);

            aggregates("#monthly_supected_duplicates",monthly['suspected_duplicates'],  monthly['reported']);
            aggregates("#annual_supected_duplicates",yearly['suspected_duplicates'],yearly['reported']);

            aggregates("#monthly_amendement",monthly['amendements_requests'], monthly['reported']);
}

function aggregates(id, value, reported){
        var percent = (value/reported) *100;
        var perId = id+"_percent";
        html = value;
        if(id !="#monthly_reported" && id != "#annual_reported"){
          html = value + " (" +(parseFloat(percent) ? parseFloat(percent).toFixed(2) : 0 ) +"%)";
        }
        $(perId).html(html);
        drawbarchart(id,percent);
}

function interPieData(data) {
  data_str = [] ; total = 0; 
  
  for(var i = 0; i < data.length ; i++) {
    total += parseFloat(data[i]["reported"]);
  }

  for(var i = 0; i < data.length ; i++) {
    //data_str.push({name: "Registered",color:'#729fcf',y: parseFloat(ever_registered_percent)});
    data_str.push({name: data[i]['district'], y: (parseFloat(data[i]["reported"])/total)*100});
  }
  return data_str;
}

function pullData(){
       console.log(time_index);
       $.getJSON('/get_data?time='+time_lines[time_index],function(data){
            var results = data.results;

            for (var i = 0 ; i < results.length ; i++){
                  var code = district_data[results[i].district][0];
                  drawMiniGraph(code+"_line_graph",results[i].reported,results[i].registered);
                  drawReportToRegisterChart(code+"_bar_graph",array_sum(results[i].registered),array_sum(results[i].reported));
                  __$(code+"_reported").innerHTML = array_sum(results[i].reported);
                  __$(code+"_registered").innerHTML = array_sum(results[i].registered);
                  __$(code+"_avg_time").innerHTML = results[i].duration;

            }
            scrollingTable();
            drawRightChart(data.current_month, data.current_year);
            drawPieChart(data.pie_chart_data);

             __$("registered").innerHTML = data.total_approved;
            __$("reported").innerHTML = data.total_registered;
            __$("avg_time").innerHTML = data.total_duration;
            __$("reg_date").innerHTML = data.reg_date;
            __$("report-header").innerHTML = data.Report_freq;

      });
}
$(document).ready(function(){
     pullData()
});
