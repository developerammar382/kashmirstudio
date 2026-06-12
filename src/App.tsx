import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import WeddingFilms from "@/pages/WeddingFilms";
import EventPhotography from "@/pages/EventPhotography";
import PortraitSessions from "@/pages/PortraitSessions";
import NotFound from "@/pages/not-found";
import TransitionOverlay from "@/components/TransitionOverlay";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Router() {
  return (
    <>
      <TransitionOverlay />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/wedding" component={WeddingFilms} />
        <Route path="/events" component={EventPhotography} />
        <Route path="/portraits" component={PortraitSessions} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
