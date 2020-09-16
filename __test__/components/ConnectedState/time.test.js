import { toRelativeTime, minute, hour, day, month, year } from '../../../source/components/ConnectedState/Patient/ConnectedState/time';

//time.js test suite
describe('Relative Time Tests', () => {
	it('-1 second', () => {
		expect(toRelativeTime(0, -1000)).toBe('-');
	});

	it('0 seconds', () => {
		expect(toRelativeTime(0, 0)).toBe('Just moments ago');
	});

	it('0.5 seconds', () => {
		expect(toRelativeTime(0, 500)).toBe('Just moments ago');
	});

	it('1 second', () => {
		expect(toRelativeTime(0, 1000)).toBe('Just moments ago');
	});

	it('30 seconds', () => {
		expect(toRelativeTime(0, 30000)).toBe('Just moments ago');
	});

	it('59 seconds', () => {
		expect(toRelativeTime(0, 59999)).toBe('Just moments ago');
	});

	it('1 minute', () => {
		expect(toRelativeTime(0, minute)).toBe('1 minute ago');
	});

	it('30 minute', () => {
		expect(toRelativeTime(0, 30 * minute)).toBe('30 minutes ago');
	});

	it('59 minute', () => {
		expect(toRelativeTime(0, 59 * minute)).toBe('59 minutes ago');
	});

	it('1 hour', () => {
		expect(toRelativeTime(0, hour)).toBe('1 hour ago');
	});

	it('12 hours', () => {
		expect(toRelativeTime(0, 12 * hour)).toBe('12 hours ago');
	});

	it('23 hours', () => {
		expect(toRelativeTime(0, 23 * hour)).toBe('23 hours ago');
	});

	it('1 day', () => {
		expect(toRelativeTime(0, day)).toBe('1 day ago');
	});

	it('15 days', () => {
		expect(toRelativeTime(0, 15 * day)).toBe('15 days ago');
	});

	it('29 days', () => {
		expect(toRelativeTime(0, 29 * day)).toBe('29 days ago');
	});

	it('1 month', () => {
		expect(toRelativeTime(0, month)).toBe('1 month ago');
	});

	it('6 month', () => {
		expect(toRelativeTime(0, 6 * month)).toBe('6 months ago');
	});

	it('11 months', () => {
		expect(toRelativeTime(0, 11 * month)).toBe('11 months ago');
	});

	it('1 year', () => {
		expect(toRelativeTime(0, year)).toBe('1 year ago');
	});

	it('5 years', () => {
		expect(toRelativeTime(0, 5 * year)).toBe('5 years ago');
	});

	it('10 years', () => {
		expect(toRelativeTime(0, 10 * year)).toBe('10 years ago');
	});
});
