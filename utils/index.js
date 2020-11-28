import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)

export const fromNow = (createdUTC) => dayjs.unix(createdUTC).fromNow();