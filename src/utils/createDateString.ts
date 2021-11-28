import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const createDateString = (date: Date) => {
   return format(date, 'h:mm, MMM d, yyyy', { locale: ru })
}