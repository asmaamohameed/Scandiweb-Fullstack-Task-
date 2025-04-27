export default async function handler(req, res) {
    const response = await fetch('http://ecommerce-task.atwebpages.com/graphql', {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(200).json(data);
  }