const messages = [
  {
    id: 1,
    text: "text 1",
    userId: 1,
  },
  {
    id: 2,
    text: "text 2",
    userId: 1,
  },
  {
    id: 3,
    text: "text 2",
    userId: 2,
  },
  {
    id: 4,
    text: "text 2",
    userId: 3,
  },
];

const users = [
  { id: 1, name: "user 1" },
  { id: 2, name: "user 2" },
  { id: 3, name: "user 3" },
];

const usersLookup = Object.fromEntries(users.map((u) => [[u.id], u]));

const messagesByUserId = messages.reduce((prev, curr) => {
  if (curr.userId in prev) {
    prev[curr.userId] = [
      ...prev[curr.userId],
      {
        ...curr,
        user: usersLookup[curr.userId],
      },
    ];
  } else {
    prev[curr.userId] = [
      {
        ...curr,
        user: usersLookup[curr.userId],
      },
    ];
  }
  return prev;
}, {});

console.dir(messagesByUserId, { depth: null });
