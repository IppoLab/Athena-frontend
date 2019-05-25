import Vue from 'vue';
import ru from 'vee-validate/dist/locale/ru';
import VeeValidate, {Validator} from 'vee-validate';

Validator.localize({ru});

Validator.extend(
    'included_by_id', {
        validate: (value, args): boolean => {
            return (args as Array<{ id: string }>).findIndex(
                (arg: { id: string }) => arg.id === (value as { id: string }).id,
            ) !== -1;
        },
    },
);

Validator.extend(
    'included_many_by_id', {
        validate: (value, args): boolean => {
            return (value as Array<{ id: string }>).filter(
                (val: { id: string }) => (args as Array<{ id: string }>).findIndex(
                    (arg: { id: string }) => val.id === arg.id,
                ) === -1,
            ).length === 0;
        },
    },
);

Validator.extend(
    'at_least_one', {
        validate(value) {
            return value.length >= 1;
        },
    },
);


Vue.use(VeeValidate, {
    locale: 'ru',
});
