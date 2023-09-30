type Mods = Record<string, boolean | string>;

export function classNames(cls: string, mods: Mods = {}, additional: string[] = []): string {
  const filteredMods: string[] = Object.entries(mods)
    .filter(([ _, flag ]) => Boolean(flag))
    .map(([ className ]) => className);

  return [
    cls,
    ...filteredMods,
    ...additional.filter(Boolean)
  ].join(' ');
}