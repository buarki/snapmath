interface MenuItem {
  href?: string;
  text: string;
  target?: string;
}

function MenuItem({ href, text, target }: MenuItem) {
  return (
    <a target={target} className="bg-primary hover:bg-primary-hover p-2 text-white font-bold" href={href}>{ text }</a>
  );
}

export function MenuBar() {
  return (
    <nav className='flex justify-end m-3'>
      <ul className='flex gap-3'>
        <li>
          <MenuItem target="_blank" href="https://github.com/buarki/snapmath" text="Github" />
        </li>
        <li>
          <MenuItem target="_blank" href="https://github.com/buarki/snapmath/blob/master/design-doc.md#1-context-overview" text="About" />
        </li>
      </ul>
    </nav>
  );
}
