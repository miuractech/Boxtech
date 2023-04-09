import { IconNotes, IconPigMoney, IconUser } from '@tabler/icons';
import { Link } from 'react-router-dom';

export default function Settings() {
  return (
    <div className="flex p-4 gap-4">
      {settingsItems.map((item) => (
        <Link to={item.path}>
          <div className="w-48 hover:bg-zinc-800 p-4 h-48 flex flex-col justify-between hover:text-white text-black text-center rounded-xl border-solid border border-gray-300">
            <div className="flex justify-center">{item.icon}</div>
            <div>{item.name}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

const settingsItems = [
  {
    icon: <IconUser size={96} />,
    name: 'privacy policy',
    path: '/settings/privacy',
  },
  {
    icon: <IconPigMoney size={96} />,
    name: 'refund policy',
    path: '/settings/refund',
  },
  {
    icon: <IconNotes size={96} />,
    name: 'terms and conditions',
    path: '/settings/tac',
  },
];
