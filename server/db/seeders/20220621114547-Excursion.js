const posts = [{
  title: 'Дагестан в моем сердце',
  text: 'Это регион  с уникальной природой региона, где есть всё: и заснеженные горы- четырёхтысячники на границе с Азербайджаном, и бархатные склоны центрального Дагестана, и обнажённые скалы, на вершинах которых обосновались неприступные аулы с их вековой историей, и спрятанные от посторонних глаз водопады,а ещё самый большой бархан Европы – Сарыкум и самое высокогорное поселение Европы – Куруш(2560 м.н.м). Запомнилось уни кальное село Дагестана, где по сей день местные жители ходят в национальной одежде,а потомственные мастера - ювелиры продолжают дело дедов и прадедов…В Дагесьане есть Сулакский каньон – один из самых глубоких каньонов мира.Проплывая по его бирюзовым водам, мы видели белоголовых сипов, парящих у нас над головами.В Дагестане вообще всё «самое»!Помимо природы и необычного быта, так можно сказать и про гостеприимство и мудрость местных жителей.',
  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Sulak_Canyon_in_Dagestan.jpg/580px-Sulak_Canyon_in_Dagestan.jpg',
  url: 'https://ru.wikipedia.org/wiki/%D0%94%D0%B0%D0%B3%D0%B5%D1%81%D1%82%D0%B0%D0%BD',
  user_id: '1',
  region_id: '5',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  title: '<Белокуриха>',
  text: 'Если Вы решили отдохнуть и укрепить здоровье - Вам в Белокуриху, в санаторий "Белокуриха".Были в этом санатории с 12 по 26 апреля 2022 года. С погодой повезло. На улице была минусовая температура, на небе светило солнце и не было ветра. Гулять в такую погоду по снежным тропах одно удовольствие.Добирались в Белокуриху мы с г. Владивостока. Самолет до Новосибирска летит 5 часов, далее автобусом от Новосибирска до города Белокуриха 7 часов.Сам санаторий большой, светлый, чистый. Персонал вежливый. В номерах современно и чисто. Мы жили в обычном двухместном номере - два взрослых человека. Нам места хватало в одной комнате.Процедуры назначил лечащий врач. Ручной массаж делали 10 дней в области поясницы. За дополнительную плату массаж можно делать на всем теле. Что я и сделала и осталась довольна.В санатории "Белокуриха" есть водно -оздоровительный комплекс. 5 процедур входит в путевку. Это очень здорово, что такой комплекс находится внутри санатория. Именно наличие этого Водного мира и повиляло на выбор санатория. Плавали, парились в саунах.Особая благодарность за шведский стол. Вкусно, много, разнообразно и полезно. Выбор блюд и для маленького ребенка и для тех, кто сидит на диете и для мужчин, которые любят много и вкусно поесть даже за ужином.Сам город небольшой, за два дня его можно обойти вдоль и поперек. Вы увидите много санаториев, гостиниц.	Мы были в удачное время, так как снег не растаял и работали горнолыжные базы, катки.В самом санатории можно бесплатно ходить в кинозал, на танцы, на концерты. Кино зал с шикарными мягкими креслами и большим экраном. Кстати, те кто часто ездят в Белокуриху, говорят, что на танцы надо ходить в санаторий "Россия".В выходные дни, когда нет процедур, Вы можете поехать на экскурсию. Правда ехать на все экскурсии от 2 часов, но полюбоваться красотой Алтайского края приятно из окна.Не пожалела ни разу, что потратилась на самолет и путевку. Все понравилось, всем рекомендую и считаю, что в определенном возрасте это самый шикарный отдых, в котором еще можно получить поддержку для организма.',
  img: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/%D0%91%D0%B5%D0%BB%D0%BE%D0%BA%D1%83%D1%80%D0%B8%D1%85%D0%B0%2C_%D0%90%D0%BB%D1%82%D0%B0%D0%B9%D1%81%D0%BA%D0%B8%D0%B9_%D0%BA%D1%80%D0%B0%D0%B9._%D0%92%D0%B8%D0%B4_%D0%BD%D0%B0_%D0%B3%D0%BE%D1%80%D0%BE%D0%B4_03.jpg',
  url: 'https://tonkosti.ru/otzyv/Sovetuyu-otdohnut-i-nabratsya-sil_%E2%80%94_o-Belokurihe-266095403',
  user_id: '1',
  region_id: '4',
  createdAt: new Date(),
  updatedAt: new Date(),
}];

module.exports = {
  async up(queryInterface, Sequelize) {
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
  */
    await queryInterface.bulkInsert('Places', posts, {});
  },

  async down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
    await queryInterface.bulkDelete('Places', null, {});
  },
};