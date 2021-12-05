import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatJoinDate = (date: Date) => {
   return format(date, 'MMM  yyyy', { locale: ru })
}