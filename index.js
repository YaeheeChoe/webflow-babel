import 'core-js/features/promise';
import 'core-js/features/object/values';
import 'core-js/features/array/includes';

const token = "01f9c53d94237d09d1991deef1b98a1bf932c4cdf6156c66280fe900620bf84e";
const Webflow = require("webflow-api");
const webflow = new Webflow({
    token: token,
});

class WebflowTheCompass{
    constructor(token) {
        this.webflow = new Webflow({
            token:token
        })
        this.token = token
    }
    async getSites(){
        return (await this.webflow.info()).sites;
    }
    async  getCollections (siteId){
        return await webflow.collections({siteId: siteId});
    }
    async getItemByName (collections, name){
        return collections.find((collection)=>{return collection.name == name})
    }
}

const setup = async () => {
    const webflowTheCompass = new WebflowTheCompass(token)
    const sites = await webflowTheCompass.getSites();
    console.log(sites);
    let collectionss = await webflowTheCompass.getCollections(sites[0]);
    const item = await webflowTheCompass.getItemByName(collectionss,"UserCounts");
    console.log(item);

    const info = await webflow.info();
    const collections = await webflow.collections({siteId: info.sites[0]});
    const items = await collections[0].items();
    console.log(items.items[1]);
    webflow.updateItem({
            itemId: items.items[0]._id,
            collectionId: collections[0]._id,
            fields: {
                count: 120,
                _archived: items.items[0]._archived,
                _draft: false,
                name: items.items[0].name,
                slug: items.items[0].slug
            }
        },{live:true}
    )
    slug: items.items[0].slug

}
setup();