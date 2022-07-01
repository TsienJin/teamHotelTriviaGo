```
{
    _id: BSON,
    sessionToken: TOKEN,
    time: TIME, // string
    usrPassword: PASSWORD, // use bcrypt to encrypt
    fileNames: [LIST, OF, STRINGS],
    mdna: {
        fileName: [
            line1,
            line2,
            line3,
        ],
        fileName2: [
            line1,
            line2,
        ]
    },
    isComplete: BOOL,
    isError: BOOL,
    
}
```