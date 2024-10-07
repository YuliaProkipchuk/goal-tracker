export const USERS = [
    {
        id:'jf123gAAAsks244',
        email: 'yuliia_pro@gmail.com',
        name: 'Юлія',
        password: '1345678'
    },
];
export const WORDS =[
    {
        id:1,
        word:'개',
        translation:'собака'
    }
]
const LANGUAGES = [
    {
        id:'1112sdfgtggttfSS',
        name: 'Learn Korean',
        type: 'language',
        create_date: new Date('2024-06-24'),
        image: '',
        toDo: [
            {
                date: new Date('2024-07-02'),
                tasks:[
                    {
                        name: 'Learn 10 words',
                        complete: true, 
                    },
                    {
                        name: 'Read 2 texts',
                        complete: true
                    }
                ]
            },
            {
                date: new Date('2024-07-03'),
                tasks:[]
            }
        ],
        dictionary:WORDS,
    }
];
export const GOALS = [...LANGUAGES]
