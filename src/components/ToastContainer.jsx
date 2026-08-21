// Toast Notification Component
import { useApp } from '../context/AppContext';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, dispatch } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type || 'info'}`}>
          {toast.type === 'success' && <CheckCircle size={16} style={{ color: '#4caf50' }} />}
          {toast.type === 'error' && <AlertCircle size={16} style={{ color: '#f44336' }} />}
          {(!toast.type || toast.type === 'info') && <Info size={16} style={{ color: 'var(--accent)' }} />}
          <span>{toast.message}</span>
          <button
            onClick={() => dispatch({ type: 'REMOVE_TOAST', payload: toast.id })}
            style={{ background: 'none', border: 'none', color: 'var(--gray-400)', cursor: 'pointer', marginLeft: 'auto', display: 'flex' }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
