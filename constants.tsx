
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '高级狗狗洗护',
    category: 'Grooming',
    description: '全身清洗、吹干和梳理。包括高级洗发水和护发素。',
    price: 45.00,
    oldPrice: 55.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApkB4rKfsdlNy2C_uFpVs84iS6vDFOck33UMTbzvLR7uhXAg6cZ3PlI_GftPkDFIumCHjRU7fN99Jd9vBDZuTrpri12qjoC1V9KoIqfKhSXBEV5GbgzVAboPYoLJVZS2JSfwhi3IxncXKGb0y8qRXOnNLokQOwb-Ya6XLrytQglSJ1uzkni1gkv5cui9_0K1ZMljTj4djSKcOTAQY1zC_l3g1cnztyptVzTUG8R6PEcibLd3842QDCDBXtxGr6e0f3rqQLnulSrg',
    rating: 4.9,
    reviews: 120,
    tags: ['Best Seller']
  },
  {
    id: '2',
    name: '有机三文鱼猫粮',
    category: 'Food',
    description: '无谷物、高蛋白的三文鱼盛宴，适合您的猫咪朋友。',
    price: 24.99,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrvKDKL1Bxl7UUHzCWk3IHZYipW8xPwD4xMUvd-9PMNr_Mdqj8cfHWiFBdm8ovuDwNU6KPAUR566m_DgtWM_tiZaBN6CrKk8kzjJEeYXuMkMojCGLblDAs9KfX8eiKaOhF9shtO6OBlXpLXNSlA1eRQSIs_CY0rsebJT3YlxhKUwphMjRObww9VD4VYy5OTRW2Ym_0eoqMsvb-CTm8f-7GCctdwG4_4TrKb6pNUwNdZhZ0xPvZgVtlUDdcj3eySX6GKrWimLCC8w',
    rating: 4.8,
    reviews: 85
  },
  {
    id: '3',
    name: '耐用发声骨头',
    category: 'Toys',
    description: '坚不可摧的橡胶骨头，适合喜欢大力咀嚼的狗狗。有益牙齿健康。',
    price: 8.99,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmrRFWSs6jCL-71jBGp43dCkIUzZlK8msknJbdt-clTB7_d5QnGWWBK6bSm04F7qwQq6tebFnBoe29cPxYiH74gQp7Dovtz7Pp030yJ98Wat2moEYS3plgcARuIYpPQH-SBawQmh9trw__EkyZ620fEfRGWQ8utJHugplK0my9Ym9oIWefeyZhlW5G0tL1V9ssInCttuwhTBDK1_U-bhLtrBuLULOQR_GwUQ9M5s2sqG_xuUPb1yHZ1mQg1Pom471HmqyaIILgYA',
    rating: 4.5,
    reviews: 210,
    tags: ['New']
  },
  {
    id: '4',
    name: '豪华猫咪SPA',
    category: 'Grooming',
    description: '为您的猫咪提供放松按摩、梳理和修剪指甲。',
    price: 65.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDt96YMHIAudD4uY7_SBDzZqIuqHtvVA3I1wLYd_pe4rcdwpvu5tOe8JvEnfsdHg_-alGv6I8O8xbxEHyOZc7DJpk2nhDph4IHg0JNSBz-1MK5zggHthj07MVI8_YMWlbrW0Awp6wXUCrXH5gyrxGSfx2yn4ZuCvv1Li_DzWKOjjaGVpppDlGnqG70IKfNXJkymlVl9xD1ZK5FEHiS9KoC2L063Cwb4v0JUFSpaEHcyoKHogqCN3phkX9mYESyaAJWnx45ifz3smg',
    rating: 4.7,
    reviews: 98
  },
  {
    id: '5',
    name: '燕麦洗发水',
    category: 'Grooming',
    description: '舒缓燕麦和芦荟配方，适合敏感肌肤。低过敏性。',
    price: 18.50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuufyZviW_6NHLoCwQLjVV1ZIOU4Wt3EzzWHzX0867YOpY15v6HPUuiRmgBlrZnVmngR58wUqoWa-HoOsy0fHWQPCfen9d1o-juwY_LkA6M0o2OU4H0I3tKNKQi7ZSus8HwnkWvxupjuTjMtbqqoTYPvWlWgm92FaoOYsl20EjMOUpJXQLjVntP4_o7_xus3wtA_ALCVM_eNA7kkHtzdF2S4_kFsEd-0dmtAOcMmhWmSzI2KO_dhJ7CPGHZhhdnSuwBz9NSghLew',
    rating: 5.0,
    reviews: 42,
    tags: ['Organic']
  },
  {
    id: '6',
    name: '优质牛肉干',
    category: 'Food',
    description: '天然高蛋白牛肉干零食，适合所有品种。',
    price: 12.99,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVKHs09vFSLhKmWD1RDxuwnPY42ldNa98SpIP3O__g54C3hYvIlhKdZMziqbl7DLOGxpkYCSxWo1Lrqxf6e_AnTO8oNhL4TCr75FRZs_LMaRaccK88ufLRBkMY5RYgXMsSyjM1iGJ5W5FnaSWuDb36OVB68fXfxJXZkUE3TXAsdJzAgRgvWbAHvWWZ6O7KK4N_-b8-4DJXLMjGD-t-Rbjh_A2jpPLEzRt6qLznPsUyZxIYr6qM4o2usu5Wds2z-Kn5mrQg7mYj0A',
    rating: 4.9,
    reviews: 320
  }
];
