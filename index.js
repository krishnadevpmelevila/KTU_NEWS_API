const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();
app.listen(5000, () => {
    console.log('listening on port 5000');
});
const news = [];
app.get('/',(req,res)=>{
    res.send("Welcome to Krishnadev P Melevila KTU NEWS api. <a href='https://instagram.com/krishnadev_p_melevila'>Click here</a> to contact Krishnadev P Melevila")
})
app.get('/ktu', (req, res) => {
    axios.get('https://www.thehindu.com/search/?q=KTU%20&order=DESC&sort=publishdate').then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        $('.75_1x_StoryCard .col-xs-12', html).each(function () {
            link = $(this).find('a').attr('href');
            genere = $(this).find('.story-card .story-card-news .story-card-heading .section-name').text().toUpperCase()
            heading = filter($(this).find('.story-card .story-card-news .story-card75x1-text').text())
            description = filter($(this).find('.story-card .story-card-news .story-card-33-text').text())
            date = $(this).find('.story-card .story-card-news span .dateline').text()
            if(genere == 'KERALA'){
                news.push({
                    link,
                    genere,
                    heading,
                    description,
                    date
                });
            }
            
        });
        res.json(news);
    });
})
function filter(titles) {
    tilte_n_stripped = titles.replace(/\n/g, '').trim()
    const title = tilte_n_stripped.replace(/\t/g, '').trim()
    return title
}

