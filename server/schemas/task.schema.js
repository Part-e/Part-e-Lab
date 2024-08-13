import { z } from 'zod';

export const createTaskSchema = z.object({
    nameEvent: z.string({ required_error: 'El nombre del vento es requerido'}),
    host: z.string({ required_error: 'El host del evento es requerido'}),
    info: z.string({ required_error: 'La información del evento es requerida'}),
    startEvent: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "La fecha y hora de inicio del evento no es válida",
        required_error: 'La fecha y hora de inicio del evento es requerida'
      }).transform(val => new Date(val)),
      endEvent: z.string().refine(val => val === undefined || !isNaN(Date.parse(val)), {
        message: "La fecha y hora de fin del evento no es válida",
      }).optional().transform(val => val ? new Date(val) : undefined),
    location: z.string({ required_error: 'La ubicación es requerida'}),
    menu: z.string().optional(),
    importantInfo: z.string().optional(),
    pin: z.string({required_error: 'El PIN del evento es requerido'}),
    check: z.boolean({ required_error: 'Debes aceptar los términos y condiciones'})
});