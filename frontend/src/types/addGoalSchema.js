import { z } from "zod";

export const addGoalSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description:z.string().optional().or(z.literal('')),
    type: z.enum(['education', 'health', 'sport', 'travel', 'career', 'other'], { message: 'Type must be one of the proposed here' }),
    due_date: z.string().date().optional().or(z.literal(''))
})
// .refine(data => {
//     if (data.due_date) {
//         return (data.due_date.getTime() - new Date().getTime()) >= 1
//     }
//     return true
// }, { message: 'Due date must be later than today', path: ['due_date'] })