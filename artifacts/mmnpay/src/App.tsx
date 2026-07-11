import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Home from '@/pages/Home';
import Checkout from '@/pages/Checkout';
import Pay from '@/pages/Pay';
import Dashboard from '@/pages/Dashboard';
import Transactions from "@/pages/Transactions";
import Customers from "@/pages/Customers";
import Invoices from "@/pages/Invoices";
import CreateInvoice from "@/pages/CreateInvoice";
import EditInvoice from "@/pages/EditInvoice";
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { LanguageProvider } from '@/lib/language';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/pay/:id" component={Pay} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/customers" component={Customers} />
      <Route path="/invoices" component={Invoices} />
      <Route path="/invoices/create" component={CreateInvoice} />
      <Route path="/invoices/edit/:invoiceNumber" component={EditInvoice} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
