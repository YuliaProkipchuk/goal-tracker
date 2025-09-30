import { z } from "zod";

export const addGoalSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description:z.string().optional().or(z.literal('')),
    type: z.enum(['education', 'health', 'sport', 'travel', 'career', 'other'], { message: 'Type must be one of the proposed here' }),
    due_date: z.string().date().optional().or(z.literal(''))
})
