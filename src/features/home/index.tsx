import BlogList from "@/features/home/components/BlogList";
import Jumbotron from "@/features/home/components/Jumbotron";

const HomePage = () => {
  return (
    <main className="container mx-auto px-4">
      <Jumbotron />
      <BlogList />
    </main>
  );
};

export default HomePage;