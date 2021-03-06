import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp();

exports.getTracksData = functions.https.onRequest(async (req, res) => {
    const allTracks: Array<any> = await getAllCollectionItems('tracks');
    const demos = await getAllCollectionItems('demos');
    const gtp = await getAllCollectionItems('gtp');
    const comments = await getAllCollectionItems('comments');
    const medias = await getAllCollectionItems('media');

    const data: Array<any> = allTracks.map(item => {
        const cDemos = demos.filter(demo => demo.trackId === item.id);
        const cGtps = gtp.filter(gtp => gtp.trackId === item.id);
        const cComments = comments.filter(comment => comment.trackId === item.id);
        const cMedia = medias.filter(media => media.trackId === item.id);
        return {
            ...item,
            demos: cDemos,
            gtp: cGtps,
            comments: cComments,
            media: cMedia,
        }
    })

    res.send(data);
});

exports.getTrackMedia = functions.https.onRequest(async (req, res) => {
    const { id } = req.body;
    const demos = await getCollectionItemsByTrackId('demos', id);
    const gtp = await getCollectionItemsByTrackId('gtp', id);

    res.send({
        demos,
        gtp
    });
});

async function getCollectionItemsByTrackId (collectionName: String, key: String){
    const firestore = admin.firestore();
    const items: Array<any> = [];
    const itemsRef = await firestore.collection(collectionName).where("trackId", "==", key).get();
    itemsRef.forEach((item: any) => {
        items.push({...item.data(), id: item.id})
    });

    return items;
};

exports.getAllComments = functions.https.onRequest(async (req, res) => {
    const comments = getAllCollectionItems('comments');

    res.send(comments);
});

async function getAllCollectionItems (collectionName: String) {
    const firestore = admin.firestore();
    const items: Array<any> = [];
    const itemsRef = await firestore.collection(collectionName).get();
    itemsRef.forEach((item: any) => {
        items.push({...item.data(), id: item.id})
    });

    return items;
}

exports.sendComment = functions.https.onRequest(async (req, res) => {
    const { creator, text, trackId } = req.body;
    const firestore = admin.firestore();

    const commentsRef = firestore.collection('comments');
    commentsRef.add({ creator, text, trackId, createdAt: new Date() }).then(() => res.send('SUCCESS'));
});

exports.getAllTrackComments = functions.https.onRequest(async (req, res) => {
    const {key} = req.body;
    const firestore = admin.firestore();
    const items: Array<any> = [];
    const itemsRef = await firestore.collection('comments').where("trackId", "==", key).orderBy('createdAt', "desc").get();
    itemsRef.forEach((item: any) => {
        items.push({...item.data(), id: item.id})
    });

    res.send(items);
});

exports.sendMedia = functions.https.onRequest(async (req, res) => {
    const { type, media } = req.body;
    const collection = admin.firestore().collection(type);
    await collection.add({
        ...media,
    });

    console.log('req =>' ,req.body);


    if (req.body.comment) {
        const { comment } = req.body;
        const collerctionComment = admin.firestore().collection('comments');
        await collerctionComment.add({
            ...comment
        });
    }

    res.send('SUCCESS');
});

exports.createNewTrack = functions.https.onRequest(async (req, res) => {
    const { createdAt = new Date(), creator, name, updatedAt = new Date() } = req.body;
    const trackCollection = admin.firestore().collection('tracks'); 
    await trackCollection.add({
        createdAt, creator, name, updatedAt
    });
    res.send("SUCCESS");
});
