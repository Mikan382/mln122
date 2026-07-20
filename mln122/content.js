/* Nội dung học thuật tách khỏi game engine để nhóm có thể rà soát độc lập. */
window.MLN122_CONTENT = {
  version: "2026.07.18",
  title: "Hồ sơ Đổi mới 1986–2026",
  subtitle: "Một hành trình điều tra về công nghiệp hóa, hiện đại hóa và hội nhập kinh tế quốc tế của Việt Nam",

  eras: [
    {
      id: "doi-moi",
      order: 0,
      number: "01",
      period: "1986–1995",
      title: "Mở khóa Đổi mới",
      kicker: "Thay đổi thể chế để giải phóng sức sản xuất",
      accent: "#a84d12",
      sceneBase: "#e6b56f",
      artwork: "./assets/era-01-doi-moi-1986-1995.jpg",
      artworkAlt: "Không gian đô thị và sản xuất Việt Nam những năm đầu Đổi mới",
      mission: "Tìm ba chứng cứ giải thích vì sao Đổi mới là điểm mở đầu cần thiết cho tiến trình công nghiệp hóa, hiện đại hóa.",
      hotspots: [
        {
          id: "old-model",
          x: 19,
          y: 57,
          type: "Bối cảnh",
          title: "Điểm nghẽn của cơ chế cũ",
          lead: "Công nghiệp hóa không thể tăng tốc nếu cơ chế quản lý làm sức sản xuất bị bó hẹp.",
          body: "Trước Đổi mới, nền kinh tế vận hành chủ yếu theo cơ chế kế hoạch hóa tập trung, quan liêu và bao cấp. Khó khăn kinh tế – xã hội đặt ra yêu cầu thay đổi đồng bộ cách tổ chức và quản lý sản xuất.",
          takeaway: "Điều kiện thể chế là một bộ phận của điều kiện sản xuất xã hội.",
          sourceIds: ["moit_1986_2006", "session26_3"]
        },
        {
          id: "congress-vi",
          x: 49,
          y: 34,
          type: "Quyết sách",
          title: "Đại hội VI và bước ngoặt 1986",
          lead: "Đổi mới toàn diện mở đường cho nhiều thành phần kinh tế phát huy năng lực sản xuất.",
          body: "Đại hội VI năm 1986 khởi xướng đường lối Đổi mới. Trọng tâm kinh tế là từng bước chuyển khỏi cơ chế tập trung bao cấp, thừa nhận nền kinh tế nhiều thành phần và vận hành theo cơ chế thị trường có sự quản lý của Nhà nước.",
          takeaway: "Đổi mới tạo tiền đề để huy động nguồn lực cho công nghiệp hóa.",
          sourceIds: ["moit_1986_2006", "worldbank_doi_moi"]
        },
        {
          id: "asean-1995",
          x: 78,
          y: 59,
          type: "Dấu mốc",
          title: "Mở rộng không gian phát triển",
          lead: "Việt Nam gia nhập ASEAN ngày 28/7/1995, đánh dấu một bước hội nhập khu vực quan trọng.",
          body: "Mở cửa và kết nối khu vực tạo thêm không gian thị trường, hợp tác và chuẩn bị cho quá trình hội nhập sâu hơn. Dấu mốc này không tự hoàn thành công nghiệp hóa, nhưng mở thêm điều kiện để thúc đẩy nó.",
          takeaway: "Hội nhập là phương tiện tạo nguồn lực, không phải đích đến tự thân.",
          sourceIds: ["asean_membership", "session27_8"]
        }
      ],
      puzzle: {
        type: "order",
        title: "Khôi phục chuỗi chuyển biến",
        prompt: "Sắp xếp các mắt xích theo logic từ nguyên nhân đến kết quả mở đầu. Chọn một thẻ rồi dùng nút lên/xuống.",
        items: [
          { id: "a", text: "Những hạn chế của cơ chế cũ bộc lộ, đặt ra yêu cầu đổi mới" },
          { id: "b", text: "Đại hội VI năm 1986 khởi xướng đường lối Đổi mới" },
          { id: "c", text: "Nguồn lực và sức sản xuất của nhiều thành phần kinh tế được khơi thông" },
          { id: "d", text: "Không gian hợp tác khu vực được mở rộng với dấu mốc ASEAN năm 1995" }
        ],
        answer: ["a", "b", "c", "d"],
        hints: [
          "Hãy bắt đầu từ vấn đề khiến Việt Nam phải thay đổi cách tổ chức nền kinh tế.",
          "Dấu mốc ASEAN nằm cuối chuỗi vì nó phản ánh không gian phát triển đã mở rộng."
        ],
        explanation: "Chuỗi đúng cho thấy công nghiệp hóa không chỉ là thêm máy móc: nó cần một môi trường thể chế có khả năng huy động và giải phóng nguồn lực xã hội."
      },
      journal: {
        thesis: "Đổi mới thể chế là tiền đề để công nghiệp hóa, hiện đại hóa chuyển từ ý chí sang khả năng huy động nguồn lực thực tế.",
        achievements: ["Khơi thông sức sản xuất", "Mở rộng quan hệ kinh tế đối ngoại", "Tạo nền cho giai đoạn tăng tốc"],
        limitations: ["Điểm xuất phát thấp", "Cơ cấu và năng lực công nghiệp còn hạn chế"]
      }
    },

    {
      id: "acceleration",
      order: 1,
      number: "02",
      period: "1996–2006",
      title: "Tăng tốc CNH–HĐH",
      kicker: "Gắn chuyển dịch cơ cấu với mở cửa có lộ trình",
      accent: "#1f5f9c",
      sceneBase: "#94b9d6",
      artwork: "./assets/era-02-tang-toc-1996-2006.jpg",
      artworkAlt: "Khu công nghiệp, cảng và hạ tầng Việt Nam giai đoạn tăng tốc",
      mission: "Xác định cách thị trường, vốn, công nghệ và năng lực cạnh tranh liên kết với tiến trình công nghiệp hóa, hiện đại hóa.",
      hotspots: [
        {
          id: "cnh-hdh",
          x: 18,
          y: 39,
          type: "Khái niệm",
          title: "Từ lao động thủ công đến công nghệ tiên tiến",
          lead: "CNH–HĐH là quá trình chuyển đổi căn bản, toàn diện hoạt động sản xuất và quản lý.",
          body: "Theo nội dung Chương 6, quá trình này chuyển từ sử dụng sức lao động thủ công là chính sang sử dụng phổ biến sức lao động cùng công nghệ, phương tiện và phương pháp tiên tiến, hiện đại; dựa trên phát triển công nghiệp và tiến bộ khoa học – công nghệ.",
          takeaway: "Đích đo không chỉ là sản lượng, mà còn là năng suất lao động xã hội.",
          sourceIds: ["session25_6", "session24_14"]
        },
        {
          id: "integration-resources",
          x: 50,
          y: 61,
          type: "Động lực",
          title: "Thị trường, vốn và công nghệ",
          lead: "Hội nhập có thể bổ sung nguồn lực cho chuyển dịch cơ cấu kinh tế.",
          body: "Mở rộng thị trường, thu hút vốn và tiếp cận công nghệ tạo điều kiện cho sản xuất phát triển. Các nguồn lực này chỉ phát huy hiệu quả khi được chuyển thành năng lực sản xuất, quản lý và cạnh tranh trong nước.",
          takeaway: "Nguồn lực bên ngoài cần được hấp thụ bằng năng lực bên trong.",
          sourceIds: ["session27_8", "session28_5"]
        },
        {
          id: "roadmap",
          x: 81,
          y: 35,
          type: "Nguyên tắc",
          title: "Hội nhập không bằng mọi giá",
          lead: "Chủ động chuẩn bị điều kiện và chọn lộ trình phù hợp là một phần của hội nhập.",
          body: "Giáo trình nhấn mạnh cần chuẩn bị các điều kiện trong nền kinh tế, hoàn thiện thể chế và nâng cao năng lực cạnh tranh. Lộ trình hội nhập phải phù hợp với điều kiện đất nước thay vì nóng vội hoặc thụ động.",
          takeaway: "Chủ động hội nhập nghĩa là biết mình cần chuẩn bị gì và bảo vệ năng lực phát triển nào.",
          sourceIds: ["session27_9", "session29_6", "session29_9"]
        }
      ],
      puzzle: {
        type: "match",
        title: "Nối nguồn lực với tác động",
        prompt: "Chọn một thẻ bên trái, rồi chọn tác động phù hợp bên phải.",
        left: [
          { id: "market", text: "Mở rộng thị trường" },
          { id: "capital-tech", text: "Vốn và công nghệ" },
          { id: "roadmap", text: "Điều kiện và lộ trình" },
          { id: "competition", text: "Năng lực cạnh tranh" }
        ],
        right: [
          { id: "r3", text: "Giảm rủi ro hội nhập nóng vội, thiếu chuẩn bị" },
          { id: "r1", text: "Tạo thêm không gian tiêu thụ và kết nối sản xuất" },
          { id: "r4", text: "Giúp doanh nghiệp đứng vững trước sức ép mở cửa" },
          { id: "r2", text: "Bổ sung nguồn lực cho đổi mới sản xuất và cơ cấu" }
        ],
        answer: { market: "r1", "capital-tech": "r2", roadmap: "r3", competition: "r4" },
        hints: [
          "Thị trường gắn với đầu ra; vốn và công nghệ gắn với năng lực sản xuất.",
          "Lộ trình xử lý rủi ro; cạnh tranh quyết định khả năng đứng vững."
        ],
        explanation: "Hội nhập tác động đến CNH–HĐH qua nhiều kênh. Các kênh này bổ trợ nhau nhưng không thể thay thế năng lực nội sinh."
      },
      journal: {
        thesis: "Giai đoạn tăng tốc cho thấy CNH–HĐH của Việt Nam diễn ra trong kinh tế thị trường và ngày càng gắn với hội nhập quốc tế.",
        achievements: ["Mở rộng không gian thị trường", "Bổ sung vốn và công nghệ", "Thúc đẩy chuyển dịch cơ cấu"],
        limitations: ["Sức cạnh tranh chưa đồng đều", "Nguy cơ phụ thuộc nếu năng lực hấp thụ yếu"]
      }
    },

    {
      id: "deep-integration",
      order: 2,
      number: "03",
      period: "2007–2020",
      title: "Hội nhập sâu",
      kicker: "Cơ hội tăng trưởng đi cùng sức ép nâng chất",
      accent: "#a53d38",
      sceneBase: "#d99588",
      artwork: "./assets/era-03-hoi-nhap-sau-2007-2020.jpg",
      artworkAlt: "Cảng container và mạng lưới thương mại Việt Nam trong thời kỳ hội nhập sâu",
      mission: "Đối chiếu thành tựu với những giới hạn để kiểm tra nhận định: hội nhập tạo cơ hội nhưng không tự động bảo đảm chất lượng công nghiệp hóa.",
      hotspots: [
        {
          id: "wto-2007",
          x: 20,
          y: 62,
          type: "Dấu mốc",
          title: "Gia nhập WTO",
          lead: "Việt Nam trở thành thành viên WTO ngày 11/1/2007.",
          body: "Dấu mốc WTO phản ánh mức độ tham gia sâu hơn vào các luật chơi và quan hệ kinh tế toàn cầu. Nó mở thêm cơ hội về thị trường và hợp tác, đồng thời làm sức ép cạnh tranh trở nên trực tiếp hơn.",
          takeaway: "Cam kết hội nhập mở cửa cơ hội; năng lực trong nước quyết định cách khai thác cơ hội ấy.",
          sourceIds: ["wto_vietnam", "session27_5"]
        },
        {
          id: "growth-structure",
          x: 51,
          y: 31,
          type: "Thành tựu",
          title: "Quy mô và cơ cấu chuyển biến",
          lead: "Giai đoạn 2011–2020 đạt tăng trưởng GDP bình quân 6,17%/năm; công nghiệp và dịch vụ chiếm 72,7% GDP năm 2020.",
          body: "Nghị quyết 29-NQ/TW ghi nhận cơ cấu kinh tế chuyển dịch tích cực và công nghiệp từng bước chuyển từ khai thác, gia công sang chế biến, chế tạo. Đây là bằng chứng về thay đổi quy mô và cấu trúc.",
          takeaway: "Thành tựu về tốc độ và cơ cấu là có thật, nhưng chưa nói hết chất lượng phát triển.",
          sourceIds: ["resolution29"]
        },
        {
          id: "internal-weakness",
          x: 80,
          y: 58,
          type: "Giới hạn",
          title: "Năng lực nội sinh còn mỏng",
          lead: "Giá trị gia tăng, tính tự chủ và vị trí trong chuỗi giá trị vẫn là điểm nghẽn.",
          body: "Nghị quyết 29 đánh giá nội lực nền kinh tế còn yếu, phụ thuộc nhiều vào khu vực có vốn đầu tư nước ngoài; công nghiệp phát triển thiếu bền vững, giá trị gia tăng thấp và tham gia chuỗi giá trị toàn cầu còn hạn chế.",
          takeaway: "Tăng độ mở không đồng nghĩa tự động tăng độ tự chủ.",
          sourceIds: ["resolution29", "session28_6"]
        }
      ],
      puzzle: {
        type: "evidence",
        title: "Lập hồ sơ cân bằng",
        prompt: "Chọn đúng ba chứng cứ hỗ trợ nhận định: “Hội nhập vừa mở cơ hội, vừa tạo sức ép; nó không tự động bảo đảm nâng chất CNH–HĐH.”",
        items: [
          { id: "a", text: "Hội nhập mở rộng thị trường và khả năng tiếp cận vốn, công nghệ." },
          { id: "b", text: "WTO tạo một khuôn khổ cam kết và cạnh tranh sâu hơn." },
          { id: "c", text: "Nội lực yếu, giá trị gia tăng thấp và phụ thuộc bên ngoài vẫn có thể tồn tại." },
          { id: "d", text: "Mọi ngành và mọi nhóm xã hội luôn hưởng lợi ngang nhau từ hội nhập." },
          { id: "e", text: "Chỉ cần gia nhập một tổ chức quốc tế là hoàn thành hiện đại hóa." }
        ],
        answer: ["a", "b", "c"],
        hints: [
          "Một hồ sơ cân bằng cần cả chứng cứ về cơ hội lẫn chứng cứ về sức ép.",
          "Loại các mệnh đề tuyệt đối như “mọi” và “chỉ cần”."
        ],
        explanation: "Ba chứng cứ đúng tạo thành lập luận hai chiều: hội nhập cung cấp nguồn lực và khuôn khổ mới, nhưng kết quả phụ thuộc khả năng chuyển hóa chúng thành năng lực nội sinh."
      },
      journal: {
        thesis: "Hội nhập sâu làm rõ một mâu thuẫn phát triển: độ mở tăng nhanh nhưng giá trị gia tăng và tính tự chủ không tự tăng tương ứng.",
        achievements: ["Tăng trưởng và chuyển dịch cơ cấu", "Mở rộng cam kết toàn cầu", "Phát triển chế biến, chế tạo"],
        limitations: ["Giá trị gia tăng thấp", "Phụ thuộc khu vực FDI", "Vị trí trong chuỗi giá trị còn hạn chế"]
      }
    },

    {
      id: "new-model",
      order: 3,
      number: "04",
      period: "2021–2026",
      title: "Đổi chất mô hình",
      kicker: "Hiện đại hóa trong bối cảnh 4.0: tự chủ, xanh và giá trị cao",
      accent: "#176b50",
      sceneBase: "#79b99e",
      artwork: "./assets/era-04-doi-chat-2021-2026.jpg",
      artworkAlt: "Không gian sản xuất công nghệ cao, xanh và hiện đại tại Việt Nam",
      mission: "Phân biệt các điểm nghẽn đang tồn tại với những hướng chuyển đổi của mô hình CNH–HĐH giai đoạn mới.",
      hotspots: [
        {
          id: "diagnosis",
          x: 18,
          y: 34,
          type: "Chẩn đoán",
          title: "Mục tiêu cũ chưa đạt trọn vẹn",
          lead: "Mục tiêu trở thành nước công nghiệp theo hướng hiện đại vào năm 2020 chưa hoàn thành.",
          body: "Nghị quyết 29 chỉ ra quá trình CNH–HĐH còn chậm, năng suất và chất lượng tăng trưởng chưa cao, công nghiệp thiếu bền vững. Vì vậy giai đoạn mới cần chuyển trọng tâm từ chỉ tăng quy mô sang nâng chất mô hình.",
          takeaway: "Nhìn thẳng vào giới hạn là điểm xuất phát của chiến lược mới.",
          sourceIds: ["resolution29"]
        },
        {
          id: "domestic-capacity",
          x: 50,
          y: 62,
          type: "Chuyển đổi",
          title: "Từ gia công đến năng lực trong nước",
          lead: "Nâng cao tự chủ về sản xuất, thị trường và công nghệ; dịch chuyển lên các khâu giá trị cao hơn.",
          body: "Định hướng mới gắn CNH–HĐH với khoa học – công nghệ, đổi mới sáng tạo, chuyển đổi số và khả năng thích ứng với Cách mạng công nghiệp lần thứ tư; phát triển năng lực nghiên cứu, thiết kế và sản xuất tại Việt Nam thay vì dừng ở lắp ráp, gia công.",
          takeaway: "Giá trị cao đến từ khả năng làm chủ tri thức, thiết kế và công nghệ.",
          sourceIds: ["resolution29", "session25_7"]
        },
        {
          id: "green-transition",
          x: 81,
          y: 36,
          type: "Chuyển đổi",
          title: "Từ thâm dụng tài nguyên đến xanh",
          lead: "Công nghiệp xanh và phát thải carbon thấp trở thành tiêu chí của hiện đại hóa.",
          body: "Định hướng đến 2030 yêu cầu chuyển dịch các ngành thâm dụng tài nguyên, năng lượng sang ngành công nghiệp xanh, công nghiệp phát thải carbon thấp và có giá trị gia tăng cao.",
          takeaway: "Hiện đại không chỉ là mới hơn; còn phải hiệu quả và bền vững hơn.",
          sourceIds: ["resolution29"]
        }
      ],
      puzzle: {
        type: "classify",
        title: "Chẩn đoán hay hướng chuyển đổi?",
        prompt: "Chọn từng thẻ rồi phân vào đúng nhóm.",
        categories: [
          { id: "bottleneck", label: "Điểm nghẽn" },
          { id: "direction", label: "Hướng chuyển đổi" }
        ],
        items: [
          { id: "a", text: "Giá trị gia tăng thấp", answer: "bottleneck" },
          { id: "b", text: "Phụ thuộc nhiều vào năng lực bên ngoài", answer: "bottleneck" },
          { id: "c", text: "Phát triển nghiên cứu, thiết kế và sản xuất trong nước", answer: "direction" },
          { id: "d", text: "Công nghiệp xanh, phát thải carbon thấp", answer: "direction" },
          { id: "e", text: "Khoa học – công nghệ, đổi mới sáng tạo và chuyển đổi số", answer: "direction" },
          { id: "f", text: "Tham gia chuỗi giá trị ở khâu có hàm lượng tri thức thấp", answer: "bottleneck" }
        ],
        hints: [
          "Điểm nghẽn mô tả trạng thái cần vượt qua; hướng chuyển đổi mô tả năng lực cần xây dựng.",
          "Các cụm “giá trị thấp”, “phụ thuộc” là dấu hiệu của điểm nghẽn."
        ],
        explanation: "Mô hình mới xử lý đồng thời ba yêu cầu: tăng năng lực nội sinh, dịch chuyển lên giá trị cao và bảo đảm phát triển xanh, bền vững."
      },
      journal: {
        thesis: "Trong bối cảnh Cách mạng công nghiệp lần thứ tư, giai đoạn mới đặt trọng tâm vào chất lượng công nghiệp hóa: tự chủ hơn, dựa trên tri thức hơn và bền vững hơn.",
        achievements: ["Có định hướng chuyển đổi rõ", "Đặt nội lực và đổi mới sáng tạo ở vị trí trung tâm"],
        limitations: ["Khoảng cách từ định hướng đến năng lực thực tế", "Sức ép công nghệ, cạnh tranh và chuyển đổi xanh"]
      }
    }
  ],

  finalChallenge: {
    title: "Giải mã mô hình phát triển",
    prompt: "Phân loại các đặc trưng theo hai mô hình khái quát. Đây là phép so sánh học thuật; thực tiễn có thể đan xen cả hai.",
    categories: [
      { id: "traditional", label: "CNH truyền thống", note: "Thiên về cơ giới hóa, mở rộng quy mô và đi theo tuần tự" },
      { id: "modern", label: "CNH hiện đại", note: "Gắn tri thức, hội nhập chủ động, giá trị cao và bền vững" }
    ],
    items: [
      { id: "f1", text: "Khởi đầu từ công nghiệp nhẹ, ngành cần ít vốn và có khả năng sinh lợi cao", answer: "traditional", sourceId: "session24_16" },
      { id: "f2", text: "Quá trình công nghiệp hóa có thể kéo dài khoảng 60–80 năm", answer: "traditional", sourceId: "session24_16" },
      { id: "f3", text: "Ưu tiên công nghiệp nặng để nhanh chóng xây dựng cơ sở vật chất – kỹ thuật", answer: "traditional", sourceId: "session24_17" },
      { id: "f4", text: "Trọng tâm là cơ khí, điện – cơ khí và tự động hóa cục bộ", answer: "traditional", sourceId: "session24_7_8" },
      { id: "f5", text: "Gắn công nghiệp hóa với kinh tế tri thức và đổi mới sáng tạo", answer: "modern", sourceId: "session25_7" },
      { id: "f6", text: "Diễn ra trong kinh tế thị trường định hướng xã hội chủ nghĩa và chủ động hội nhập quốc tế", answer: "modern", sourceId: "session25_7" },
      { id: "f7", text: "Hướng đến tự chủ công nghệ và các khâu có giá trị cao", answer: "modern", sourceId: "resolution29" },
      { id: "f8", text: "Xem xanh, carbon thấp và bền vững là tiêu chí phát triển", answer: "modern", sourceId: "resolution29" }
    ],
    explanation: "CNH–HĐH ở Việt Nam không sao chép một mô hình tuyến tính. Quá trình này cần tận dụng hội nhập và công nghệ mới, đồng thời xây dựng năng lực tự chủ, giá trị gia tăng và tính bền vững."
  },

  sources: {
    session24_7_8: { group: "Bài giảng", label: "Session 24 — slide 7–8", detail: "Các trình độ phát triển từ cơ khí đến tự động hóa cục bộ." },
    session24_14: { group: "Bài giảng", label: "Session 24 — slide 14", detail: "Khái niệm công nghiệp hóa và năng suất lao động xã hội." },
    session24_16: { group: "Bài giảng", label: "Session 24 — slide 16", detail: "Mô hình công nghiệp hóa cổ điển và thời gian thực hiện." },
    session24_17: { group: "Bài giảng", label: "Session 24 — slide 17", detail: "Mô hình công nghiệp hóa kiểu Liên Xô, ưu tiên công nghiệp nặng." },
    session25_6: { group: "Bài giảng", label: "Session 25 — slide 6", detail: "Khái niệm công nghiệp hóa, hiện đại hóa ở Việt Nam." },
    session25_7: { group: "Bài giảng", label: "Session 25 — slide 7", detail: "Đặc điểm CNH–HĐH trong kinh tế tri thức, thị trường và hội nhập." },
    session26_3: { group: "Bài giảng", label: "Session 26 — slide 3", detail: "Nội dung CNH–HĐH: điều kiện sản xuất, khoa học – công nghệ, cơ cấu và quan hệ sản xuất." },
    session27_5: { group: "Bài giảng", label: "Session 27 — slide 5", detail: "Khái niệm hội nhập kinh tế quốc tế." },
    session27_8: { group: "Bài giảng", label: "Session 27 — slide 8", detail: "Hội nhập mở rộng thị trường, thu hút vốn và thúc đẩy CNH–HĐH." },
    session27_9: { group: "Bài giảng", label: "Session 27 — slide 9", detail: "Chuẩn bị điều kiện, phương thức và lộ trình hội nhập phù hợp." },
    session28_5: { group: "Bài giảng", label: "Session 28 — slide 5", detail: "Tác động tích cực của hội nhập đối với thị trường, công nghệ, vốn và cơ cấu." },
    session28_6: { group: "Bài giảng", label: "Session 28 — slide 6", detail: "Sức ép cạnh tranh, phụ thuộc và phân phối lợi ích không đồng đều." },
    session29_6: { group: "Bài giảng", label: "Session 29 — slide 6", detail: "Xây dựng chiến lược và lộ trình hội nhập phù hợp." },
    session29_9: { group: "Bài giảng", label: "Session 29 — slide 9", detail: "Nâng cao năng lực cạnh tranh quốc tế của nền kinh tế." },
    moit_1986_2006: {
      group: "Nguồn chính thống",
      label: "Bộ Công Thương — Giai đoạn 1986–2006",
      detail: "Đổi mới cơ chế kinh tế, phát triển công nghiệp và các mốc hội nhập.",
      url: "https://moit.gov.vn/gioi-thieu/cac-thoi-ky-phat-trien/giai-doan-1986-2006.html"
    },
    worldbank_doi_moi: {
      group: "Nguồn tham khảo",
      label: "World Bank — Vietnam Development Report 2012",
      detail: "Khái quát chuyển đổi kinh tế từ Đổi mới 1986.",
      url: "https://www.worldbank.org/en/news/feature/2012/01/12/vietnam-development-report-2012-an-overview"
    },
    asean_membership: {
      group: "Nguồn chính thống",
      label: "ASEAN — 50 Years ASEAN",
      detail: "Việt Nam gia nhập ASEAN ngày 28/7/1995.",
      url: "https://asean.org/wp-content/uploads/2012/05/ASEAN50_Master_Publication.pdf"
    },
    wto_vietnam: {
      group: "Nguồn chính thống",
      label: "WTO — Viet Nam and the WTO",
      detail: "Việt Nam là thành viên WTO từ ngày 11/1/2007.",
      url: "https://www.wto.org/english/thewto_e/countries_e/vietnam_e.htm"
    },
    resolution29: {
      group: "Nguồn chính thống",
      label: "Nghị quyết 29-NQ/TW (2022)",
      detail: "Đánh giá CNH–HĐH và định hướng đến năm 2030, tầm nhìn 2045.",
      url: "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-quyet-29-nq-tw-ve-tiep-tuc-day-manh-cong-nghiep-hoa-hien-dai-hoa-dat-nuoc-den-nam-2030-119221129121112971.htm"
    }
  }
};
