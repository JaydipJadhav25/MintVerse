interface Props {
  title: string;
  desc: string;
}

const FeatureCard = ({ title, desc }: Props) => {
  return (
    <div className="bg-card p-6 rounded-2xl shadow-md hover:scale-105 transition duration-300">
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
};

export default FeatureCard;