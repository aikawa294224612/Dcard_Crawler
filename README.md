# Dcard 爬蟲-熱門發文時間統計

![enter image description here](https://lh3.googleusercontent.com/qzJkUDs3PHWLzpC649Fm4r4-xO734xCoGvLP1liPptTm9jj88ab0xSgfLu3RoedzLAtepGvfRHZk)

### request

    request({
        url: "你想抓的網址",
        method: "GET"
      }, function(e,r,b) { /* Callback 函式 */
        /* e: 錯誤代碼 */
        /* b: 傳回的資料內容 */
      });
### Cheerio

     $ = cheerio.load(blogHTMLString);
      titles = $("li.item h2");
   var result = [];
    for(i=0;i<titles.length;i++) { result.push($(titles[i]).text()); }


### node-schedule
[ Nodejs定时任务（node-schedule)](https://www.jianshu.com/p/8d303ff8fdeb)

    npm install node-schedule --save

**Cron风格定时器**

    const schedule = require('node-schedule');
    
    const  scheduleCronstyle = ()=>{
      //每分钟的第30秒定时执行一次:
        schedule.scheduleJob('30 * * * * *',()=>{
            console.log('scheduleCronstyle:' + new Date());
        }); 
    }
    
    scheduleCronstyle();

参数

    每分钟的第30秒触发： '30 * * * * *'
    
    每小时的1分30秒触发 ：'30 1 * * * *'
    
    每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
    
    每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
    
    2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'
    
    每周1的1点1分30秒触发 ：'30 1 1 * * 1'



[資料視覺化D3.js的範例](https://blog.twtnn.com/2015/06/d3js.html)

[Simple Line Graph using SVG and d3.js](http://bl.ocks.org/benjchristensen/2579599)

[資料爬蟲實戰－使用 node.js](http://blog.infographics.tw/2015/03/crawl-data-with-nodejs/)
