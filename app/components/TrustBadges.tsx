// src/components/TrustBadges.tsx
const TrustBadges = () => {
  const badges = ["Forbes", "TechCrunch", "WSJ", "CNN"];

  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
          {badges.map((badge, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={`https://via.placeholder.com/150x60?text=${badge}`}
                alt={badge}
                className="h-12 opacity-70"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
