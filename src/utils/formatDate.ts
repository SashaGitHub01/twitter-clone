import { formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDate = (date: Date) => {
   return formatDistance(new Date(), date, { locale: ru })
}