export default function errorHandler(req, res) {
    return res.status(404).end('Page is not found');
}
