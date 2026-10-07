import { cn } from '../../utils/cn';

interface IProps extends Children {
  cn?: string;
}
const Container = ({ children, cn: className }: IProps) => {
  return (
    <div className={cn('w-full container mx-auto px-5 md:px-10', className)}>
      {children}
    </div>
  );
};

export default Container;
