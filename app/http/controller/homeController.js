const Indianvegstarter = require('../../models/indianvegstarter')
const Bread=require('../../models/bread')
const Chineseitem=require('../../models/chineseitem')
const Indiannonvegstarter=require('../../models/indiannonvegstarter')
const Khaopiyobiryani=require('../../models/khaopiyobiryani')
const Khaopiyoquick=require('../../models/khaopiyoquick')
const Nonvegmaincourse=require('../../models/nonvegmaincourse')
const Raitaandsalad=require('../../models/raitaandsalad')
const Riceoption=require('../../models/riceoption')
const Thali=require('../../models/thali')
const Vegmaincourse=require('../../models/vegmaincourse')

function homeController() {
    return {
       async index(req, res) {
            const ivs=await Indianvegstarter.find();
            const bread=await Bread.find();
            const chineseitem=await Chineseitem.find();
            const indiannonvegstarter=await Indiannonvegstarter.find();
            const khaopiyobiryani=await Khaopiyobiryani.find();
            const khaopiyoquick=await Khaopiyoquick.find();
            const nonvegmaincourse=await Nonvegmaincourse.find();
            const raitaandsalad=await Raitaandsalad.find();
            const riceoption=await Riceoption.find();
            const thali=await Thali.find();
            const vegmaincourse=await Vegmaincourse.find();
            return res.render("home",{ivs:ivs,bread:bread,chineseitem:chineseitem,indiannonvegstarter:indiannonvegstarter,khaopiyobiryani:khaopiyobiryani,khaopiyoquick:khaopiyoquick,nonvegmaincourse:nonvegmaincourse,raitaandsalad:raitaandsalad,riceoption:riceoption,thali:thali,vegmaincourse:vegmaincourse});
            
           
        }
    }
}




module.exports = homeController;