```
{
    _id: BSON,
    sessionToken: TOKEN,
    time: TIME // string
    usrPassword: PASSWORD // use bcrypt to encrypt
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