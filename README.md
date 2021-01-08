# Dcard 爬蟲-熱門發文時間統計
探討Dcard上熱門的文章是否與發文時間有關(仍有其他影響因素，如主題)，抓取並統計一個月熱門文章之發文時間時段，統計分析結果呈現16點是熱門文章高峰，與當初還未收集資料前的想法有所出入
未來想法: 透過AI預測出熱門文章的影響因素，並能自動產出高機率能上熱門的文章
![enter image description here](https://i.imgur.com/GTodBoY.jpg)
![enter image description here](https://i.imgur.com/HZGEinf.png)

## Info.
### How to run?

    npm install --save-dev nodemon    
    SET DEBUG=app:* & npm run devstart

## Note
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


## References
[資料視覺化D3.js的範例](https://blog.twtnn.com/2015/06/d3js.html)

[Simple Line Graph using SVG and d3.js](http://bl.ocks.org/benjchristensen/2579599)

[資料爬蟲實戰－使用 node.js](http://blog.infographics.tw/2015/03/crawl-data-with-nodejs/)
