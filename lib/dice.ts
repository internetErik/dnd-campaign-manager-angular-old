export function simpleRoll(sides): number {
	return (Math.floor((Math.random() * 100)) % sides) + 1;
}