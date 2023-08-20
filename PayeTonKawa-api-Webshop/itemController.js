const items = ['item1', 'item2', 'item3'];

exports.getItems = (req, res) => {
  res.json(items);
};

exports.createItem = (req, res) => {
  const newItem = req.body.item;
  items.push(newItem);
  res.status(201).json({ message: 'Item created successfully' });
};