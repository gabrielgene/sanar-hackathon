import React from 'react';
import { getMe } from '../../../fetches';

const Profile: React.FC = () => {
  const [data, setData] = React.useState({ email: '', imageUrl: '', name: '' });
  React.useEffect(() => {
    getMe().then((r: any) => setData(r.data));
  }, []);

  const { email, imageUrl, name } = data;

  return (
    <div>
      <img src={imageUrl} alt="Imagem do Perfil" />
      <p>Nome</p>
      <p>Créditos</p>
      <p>Ultimos vouchers</p>
      <p>Adicionar doação</p>
      <p>Blood level</p>
    </div>
  );
};

export default Profile;
