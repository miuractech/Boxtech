import { createStyles, Text, SimpleGrid, Container, rem, Transition } from '@mantine/core';
import { IconPresentationAnalytics } from '@tabler/icons';
import { IconTruck, IconCertificate, IconCoin } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    feature: {
        position: 'relative',
        paddingTop: theme.spacing.xl,
        paddingLeft: theme.spacing.xl,
    },

    overlay: {
        position: 'absolute',
        height: rem(100),
        width: rem(160),
        top: 0,
        left: 0,
        backgroundColor: "#fcf5e3",
        zIndex: 1,
    },

    content: {
        position: 'relative',
        zIndex: 2,
    },

    icon: {
        color: "#ffbe23",
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
}));

interface FeatureProps extends React.ComponentPropsWithoutRef<'div'> {
    icon: React.FC<any>;
    title: string;
    description: string;
}

function Feature({ icon: Icon, title, description, className, ...others }: FeatureProps) {
    const { classes, cx } = useStyles();

    return (
        <div className={cx(classes.feature, className)} {...others}>
            <div className={classes.overlay} />
            <div className={classes.content}>
                <Icon size={rem(38)} className={classes.icon} stroke={1.5} />
                <Text fw={700} fz="lg" mb="xs" mt={5} className={classes.title}>
                    {title}
                </Text>
                <Text c="dimmed" fz="sm">
                    {description}
                </Text>
            </div>
        </div>
    );
}

const mockdata = [
    {
        icon: IconTruck,
        title: 'Pickup Scheduling',
        description:
            'Customers can schedule pickup, book a slot for loading and unloading  the freight.',
    },
    {
        icon: IconCertificate,
        title: 'Automatic Quotation Generation',
        description:
            'Generate automatic quotations with the help of software.',
    },
    {
        icon: IconCoin,
        title: 'Pricing management and Payment',
        description:
            'Manage pricing and payments all in one integrated dashboard.',
    },
    {
        icon: IconPresentationAnalytics,
        title: 'Analytics and Customer review',
        description:
            'Analyze your sales, revenue. Record your customer feedback to know them better.',
    }
];

export function FeaturesAsymmetrical({ first }: { first: boolean }) {
    const items = mockdata.map((item, index) => (
        <Transition mounted={first} transition="slide-right" duration={1000 * index} timingFunction="ease">
            {(styles) => <Feature style={styles} {...item} key={item.title} />}
        </Transition>
    ));
    return (
        <Container mt={30} mb={30} size="lg">
            <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing={50}>
                {items}
            </SimpleGrid>
        </Container>
    );
}