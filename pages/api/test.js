import { imageHash } from 'image-hash';

export default async function handler(req, res) {
    
    imageHash('https://preview.redd.it/pfrjqw1shu161.jpg?width=640&crop=smart&auto=webp&s=49fbcb949b9a85921a8934f1fb0f35afa1ed6079', 8, true, (error, data) => {
        if (error) throw error;
        console.log(data);

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ name: 'John Doe' }))
    });
}