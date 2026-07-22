/* Nội dung học thuật tách khỏi engine để nhóm có thể rà soát độc lập. */
window.MLN122_CONTENT = {
  version: "2026.07.22-diorama-v1",
  title: "Hành trình Kiến thiết",
  subtitle: "Khám phá CNH–HĐH Việt Nam 1986–2026",
  premise: "Bạn không thay đổi lịch sử; bạn học bối cảnh, lắng nghe ba góc nhìn và lựa chọn cách ưu tiên nguồn lực trong từng điều kiện cụ thể.",
  disclaimer: "Mô hình sư phạm định tính, không phải dự báo hay số liệu thống kê quốc gia.",

  metrics: {
    structure: {
      label: "Năng suất & chuyển dịch cơ cấu",
      shortLabel: "Sản xuất",
      code: "SX",
      description: "Khả năng nâng năng suất và chuyển nguồn lực sang hoạt động có hiệu quả cao hơn."
    },
    technology: {
      label: "Công nghệ & quản trị",
      shortLabel: "Công nghệ",
      code: "CN",
      description: "Mức làm chủ phương pháp sản xuất, công nghệ và năng lực quản trị hiện đại."
    },
    integration: {
      label: "Thị trường & hội nhập",
      shortLabel: "Hội nhập",
      code: "HN",
      description: "Khả năng kết nối thị trường, vốn, công nghệ và chuẩn mực quốc tế."
    },
    autonomy: {
      label: "Nội lực & tự chủ",
      shortLabel: "Nội lực",
      code: "NL",
      description: "Năng lực trong nước đủ sức hấp thụ nguồn lực và hạn chế lệ thuộc."
    },
    sustainability: {
      label: "Giá trị cao & bền vững",
      shortLabel: "Bền vững",
      code: "BV",
      description: "Khả năng tiến lên khâu giá trị cao và sử dụng nguồn lực hiệu quả."
    }
  },

  metricOrder: ["structure", "technology", "integration", "autonomy", "sustainability"],
  gaugeOrder: ["production", "connection", "resilience"],
  initialMetrics: {
    structure: 40,
    technology: 40,
    integration: 40,
    autonomy: 40,
    sustainability: 40
  },

  eras: [
    {
      id: "doi-moi",
      order: 0,
      number: "01",
      period: "1986–1995",
      title: "Mở khóa Đổi mới",
      kicker: "Thay đổi thể chế để giải phóng sức sản xuất",
      accent: "#b84f2a",
      artwork: "./assets/era-01-doi-moi-1986-1995.jpg",
      artworkAlt: "Không gian đô thị và sản xuất Việt Nam những năm đầu Đổi mới",
      milestone: {
        label: "Mốc lịch sử cố định",
        title: "Đổi mới 1986 → gia nhập ASEAN 1995",
        text: "Đại hội VI khởi xướng Đổi mới và từng bước tháo gỡ cơ chế bao cấp. Ngày 28/7/1995, Việt Nam gia nhập ASEAN.",
        sourceIds: ["moit_1986_2006", "asean_membership"]
      },
      briefing: {
        objective: "Tạo điều kiện để nguồn lực xã hội vận động, đồng thời phục hồi sản xuất và chuẩn bị mở cửa.",
        points: [
          {
            label: "Điểm xuất phát",
            title: "Cơ chế cũ tạo điểm nghẽn",
            text: "Phân bổ hành chính kéo dài làm sản xuất thiếu động lực và nguồn lực khó lưu chuyển."
          },
          {
            label: "Bước ngoặt",
            title: "Đổi mới khơi thông nguồn lực",
            text: "Thể chế kinh tế được điều chỉnh để nhiều chủ thể phát huy năng lực sản xuất."
          },
          {
            label: "Thách thức",
            title: "Nội lực vẫn còn mỏng",
            text: "Hạ tầng, công nghệ và sức cạnh tranh chưa thể tăng ngay chỉ nhờ thay đổi cơ chế."
          }
        ],
        causal: [
          "Cải cách thể chế → nguồn lực được huy động",
          "Nguồn lực được huy động → sản xuất dần phục hồi",
          "Nội lực được chuẩn bị → mở cửa có khả năng hấp thụ"
        ],
        remember: "Đổi mới thể chế là tiền đề của CNH–HĐH, không phải kết quả cuối cùng."
      },
      advisors: [
        {
          id: "dm-the-che",
          name: "Nguyễn An",
          role: "Cố vấn thể chế",
          icon: "balance",
          x: 20,
          y: 69,
          stance: "Cải cách phải mở đường cho nguồn lực vận động.",
          insight: "Máy móc chỉ phát huy khi cơ chế phân bổ và quản lý được đổi mới đồng bộ.",
          sourceIds: ["session26_3", "moit_1986_2006"]
        },
        {
          id: "dm-san-xuat",
          name: "Trần Minh",
          role: "Kỹ sư sản xuất",
          icon: "factory",
          x: 50,
          y: 63,
          stance: "Nhu cầu trước mắt đòi hỏi phục hồi năng lực sản xuất.",
          insight: "Đầu tư hạ tầng và máy móc tạo lực kéo, nhưng có thể dàn trải nếu thiếu cải cách.",
          sourceIds: ["session24_14", "session26_3"]
        },
        {
          id: "dm-hoi-nhap",
          name: "Lê Mai",
          role: "Cố vấn hội nhập",
          icon: "globe",
          x: 79,
          y: 70,
          stance: "Thị trường khu vực là cơ hội để rút ngắn quá trình phát triển.",
          insight: "Mở cửa đem lại vốn và thị trường, đồng thời tạo sức ép khi nội lực chưa sẵn sàng.",
          sourceIds: ["session27_8", "session27_9", "asean_membership"]
        }
      ],
      dilemmas: [
        {
          id: "dm-01",
          prompt: "Đầu Đổi mới, ưu tiên nào tạo nền cho CNH–HĐH?",
          context: "Cơ chế vừa mở, sản xuất thiếu vốn và năng lực cạnh tranh còn yếu.",
          sourceIds: ["session24_14", "session26_3", "session27_9", "moit_1986_2006"],
          choices: [
            {
              id: "dm-reform-balanced",
              advisorId: "dm-the-che",
              tag: "Thể chế làm nền",
              title: "Cải cách đồng bộ",
              summary: "Khơi thông phân bổ, phục hồi sản xuất thiết yếu và mở cửa theo lộ trình.",
              effects: { structure: 5, technology: 2, integration: 3, autonomy: 5, sustainability: 1 },
              outcome: "Nguồn lực được giải phóng và hấp thụ tốt hơn; tốc độ tăng ban đầu vừa phải nhưng nền tảng cân bằng.",
              verdict: "recommended",
              verdictLabel: "Phù hợp nhất",
              rationale: "Bối cảnh điểm xuất phát thấp đòi hỏi thể chế đi trước để đầu tư và mở cửa chuyển thành năng lực thực.",
              worldChange: "Chợ và xưởng cùng sáng đèn; đường vận chuyển mở dần, khu dân cư ổn định hơn."
            },
            {
              id: "dm-production-first",
              advisorId: "dm-san-xuat",
              tag: "Tạo lực kéo",
              title: "Sản xuất đi trước",
              summary: "Dồn vốn cho hạ tầng, máy móc và hàng hóa thiết yếu để phục hồi nhanh.",
              effects: { structure: 7, technology: 4, integration: 0, autonomy: 2, sustainability: -3 },
              outcome: "Sản lượng và hạ tầng tăng rõ, nhưng đầu tư dễ dàn trải khi cơ chế điều phối chưa theo kịp.",
              verdict: "conditional",
              verdictLabel: "Hợp lý có điều kiện",
              rationale: "Phục hồi sản xuất là cần thiết, nhưng chỉ hiệu quả bền khi cách phân bổ nguồn lực đồng thời được đổi mới.",
              worldChange: "Nhà máy hoạt động mạnh và đường mới xuất hiện; khói bụi cùng các công trình dang dở cũng tăng."
            },
            {
              id: "dm-open-fast",
              advisorId: "dm-hoi-nhap",
              tag: "Đón nguồn lực ngoài",
              title: "Mở cửa thật nhanh",
              summary: "Ưu tiên thị trường, vốn và công nghệ bên ngoài để rút ngắn quá trình.",
              effects: { structure: 3, technology: 3, integration: 8, autonomy: -6, sustainability: -1 },
              outcome: "Giao thương tăng nhanh, nhưng doanh nghiệp trong nước chịu sức ép lớn và khả năng phụ thuộc gia tăng.",
              verdict: "risky",
              verdictLabel: "Tăng nhanh, rủi ro cao",
              rationale: "Ngộ nhận thường gặp là mở cửa tự động tạo hiện đại hóa; hiệu quả còn phụ thuộc năng lực hấp thụ trong nước.",
              worldChange: "Cảng và tuyến hàng hóa đông lên; biển hiệu ngoại xuất hiện nhanh trong khi nhiều xưởng nhỏ tối đèn."
            }
          ]
        }
      ],
      checkpoint: {
        question: "Vì sao Đổi mới thể chế là tiền đề của CNH–HĐH?",
        options: [
          "Vì thay đổi cơ chế khiến công nghệ tự động hiện đại.",
          "Vì nó tạo điều kiện huy động nguồn lực và chuyển nền sản xuất sang phương thức tiến bộ.",
          "Vì sau Đổi mới không còn cần xây dựng năng lực sản xuất."
        ],
        answer: 1,
        explanation: "CNH–HĐH trước hết cần tạo lập các điều kiện sản xuất – xã hội để nguồn lực được huy động hiệu quả.",
        sourceIds: ["session26_3"]
      },
      report: {
        achievement: "Cơ chế mới khơi thông nguồn lực và mở rộng không gian hợp tác khu vực.",
        limitation: "Điểm xuất phát thấp khiến sản xuất, công nghệ và sức cạnh tranh chưa thể tăng ngay.",
        thesis: "Đổi mới thể chế là tiền đề để CNH–HĐH chuyển từ chủ trương thành khả năng huy động nguồn lực thực tế."
      }
    },

    {
      id: "acceleration",
      order: 1,
      number: "02",
      period: "1996–2006",
      title: "Tăng tốc CNH–HĐH",
      kicker: "Biến nguồn lực thành năng lực sản xuất hiện đại",
      accent: "#2872a8",
      artwork: "./assets/era-02-tang-toc-1996-2006.jpg",
      artworkAlt: "Khu công nghiệp, cảng và hạ tầng Việt Nam giai đoạn tăng tốc",
      milestone: {
        label: "Mốc lịch sử cố định",
        title: "Bước vào thời kỳ đẩy mạnh CNH–HĐH",
        text: "Từ năm 1996, trọng tâm chuyển sang đẩy mạnh CNH–HĐH trong kinh tế thị trường và chuẩn bị năng lực cho hội nhập sâu hơn.",
        sourceIds: ["moit_1986_2006", "session25_7"]
      },
      briefing: {
        objective: "Kết hợp hạ tầng, vốn–công nghệ bên ngoài và sức cạnh tranh trong nước để tạo năng lực hấp thụ.",
        points: [
          {
            label: "Động lực",
            title: "Hạ tầng và đầu tư tăng",
            text: "Khu công nghiệp, logistics và dòng vốn mới mở rộng nhanh năng lực sản xuất."
          },
          {
            label: "Cơ hội",
            title: "Tiếp cận vốn và công nghệ",
            text: "Hội nhập giúp bổ sung nguồn lực mà tích lũy trong nước chưa đáp ứng đủ."
          },
          {
            label: "Điểm nghẽn",
            title: "Khả năng hấp thụ còn yếu",
            text: "Doanh nghiệp nội địa khó tiếp nhận công nghệ và tham gia sâu vào chuỗi cung ứng."
          }
        ],
        causal: [
          "Hạ tầng tốt hơn → sản xuất và lưu thông mở rộng",
          "Vốn–công nghệ ngoài → cơ hội rút ngắn quá trình",
          "Liên kết nội địa → nguồn lực ngoài trở thành nội lực"
        ],
        remember: "Nguồn lực bên ngoài chỉ bền vững khi được chuyển hóa bằng năng lực bên trong."
      },
      advisors: [
        {
          id: "tt-ha-tang",
          name: "Phạm Thu Hà",
          role: "Kiến trúc sư hạ tầng",
          icon: "route",
          x: 18,
          y: 68,
          stance: "Hạ tầng phải đi trước để tạo không gian sản xuất mới.",
          insight: "Dồn vốn tạo lực kéo rõ, nhưng có thể làm phát triển vùng mất cân đối.",
          sourceIds: ["session25_6", "session26_3"]
        },
        {
          id: "tt-dau-tu",
          name: "Vũ Đức Khôi",
          role: "Cố vấn đầu tư",
          icon: "building",
          x: 50,
          y: 62,
          stance: "Vốn và công nghệ quốc tế có thể giúp tăng tốc quy mô.",
          insight: "Thu hút đại trà dễ tạo các ốc đảo sản xuất nếu liên kết nội địa mỏng.",
          sourceIds: ["session27_8", "session28_5"]
        },
        {
          id: "tt-noi-luc",
          name: "Hoàng Bảo An",
          role: "Cố vấn doanh nghiệp nội địa",
          icon: "links",
          x: 80,
          y: 69,
          stance: "Liên kết và quản trị quyết định khả năng hấp thụ công nghệ.",
          insight: "Kết quả chậm hơn mở rộng sản lượng, nhưng tạo giá trị và năng lực trong nước.",
          sourceIds: ["session27_9", "session29_8", "session29_9"]
        }
      ],
      dilemmas: [
        {
          id: "tt-01",
          prompt: "Tăng tốc bằng cách nào để nguồn lực ngoài trở thành nội lực?",
          context: "Đầu tư và khu công nghiệp tăng, nhưng doanh nghiệp trong nước còn khó tham gia chuỗi.",
          sourceIds: ["session25_6", "session27_8", "session28_5", "session29_9"],
          choices: [
            {
              id: "tt-absorption-linkage",
              advisorId: "tt-noi-luc",
              tag: "Năng lực hấp thụ",
              title: "Liên kết để hấp thụ",
              summary: "Gắn dự án đầu tư với nhà cung ứng nội địa, quản trị và chuyển giao công nghệ.",
              effects: { structure: 4, technology: 7, integration: 5, autonomy: 7, sustainability: 2 },
              outcome: "Quy mô tăng vừa phải nhưng công nghệ lan tỏa tốt hơn, doanh nghiệp nội địa dần tham gia sâu vào chuỗi.",
              verdict: "recommended",
              verdictLabel: "Phù hợp nhất",
              rationale: "Chiến lược này kết hợp nguồn lực quốc tế với năng lực cạnh tranh trong nước, đúng điểm nghẽn của giai đoạn.",
              worldChange: "Nhà máy lớn kết nối với mạng xưởng vệ tinh; tuyến logistics sáng liền mạch thay vì các cụm tách biệt."
            },
            {
              id: "tt-infrastructure-push",
              advisorId: "tt-ha-tang",
              tag: "Tạo lực kéo",
              title: "Dồn lực hạ tầng",
              summary: "Ưu tiên đường, cảng và khu công nghiệp trọng điểm để tăng năng lực nhanh.",
              effects: { structure: 8, technology: 3, integration: 0, autonomy: 8, sustainability: -4 },
              outcome: "Sản xuất và logistics tăng mạnh, nhưng vốn tập trung cao và hiệu quả lan tỏa phụ thuộc quản trị đầu tư.",
              verdict: "conditional",
              verdictLabel: "Hợp lý có điều kiện",
              rationale: "Hạ tầng là điều kiện cần, nhưng chưa đủ nếu doanh nghiệp nội địa không được nâng sức và kết nối.",
              worldChange: "Cảng, cầu và khu công nghiệp mọc nhanh; một số vùng sáng rực trong khi vùng khác phát triển chậm."
            },
            {
              id: "tt-fdi-volume",
              advisorId: "tt-dau-tu",
              tag: "Tăng quy mô",
              title: "Ưu đãi đầu tư đại trà",
              summary: "Giảm điều kiện để thu hút thật nhiều vốn, nhà máy và đơn hàng xuất khẩu.",
              effects: { structure: 5, technology: 5, integration: 8, autonomy: -7, sustainability: -3 },
              outcome: "Nhà máy và xuất khẩu tăng nhanh, nhưng giá trị nội địa thấp và nguy cơ hình thành ốc đảo sản xuất.",
              verdict: "risky",
              verdictLabel: "Tăng nhanh, rủi ro cao",
              rationale: "Quy mô đầu tư không tự động tạo chuyển giao; thiếu điều kiện liên kết làm độ mở tăng nhanh hơn nội lực.",
              worldChange: "Nhiều nhà máy lớn sáng đèn cạnh cảng; khu doanh nghiệp nội địa vẫn thưa và ít đường kết nối."
            }
          ]
        }
      ],
      checkpoint: {
        question: "CNH–HĐH ở Việt Nam được hiểu đúng nhất là gì?",
        options: [
          "Chỉ thay lao động thủ công bằng máy móc trong công nghiệp.",
          "Chuyển đổi toàn diện sản xuất, dịch vụ và quản lý bằng công nghệ, phương pháp tiên tiến để nâng năng suất.",
          "Chỉ mở rộng quy mô sản xuất mà không cần đổi mới quản lý."
        ],
        answer: 1,
        explanation: "Khái niệm bao gồm sản xuất, dịch vụ và quản lý kinh tế – xã hội; không đồng nhất CNH–HĐH với cơ giới hóa.",
        sourceIds: ["session25_6"]
      },
      report: {
        achievement: "Hạ tầng, sản xuất và khả năng tiếp cận nguồn lực quốc tế được mở rộng.",
        limitation: "Thiếu liên kết nội địa khiến vốn và công nghệ ngoài có thể chỉ tạo tăng trưởng bề rộng.",
        thesis: "Nguồn lực bên ngoài chỉ hiệu quả khi được hấp thụ bằng năng lực bên trong."
      }
    },

    {
      id: "deep-integration",
      order: 2,
      number: "03",
      period: "2007–2020",
      title: "Hội nhập sâu",
      kicker: "Mở thị trường nhưng không đánh đổi năng lực tự chủ",
      accent: "#b34440",
      artwork: "./assets/era-03-hoi-nhap-sau-2007-2020.jpg",
      artworkAlt: "Cảng biển, logistics và sản xuất xuất khẩu Việt Nam giai đoạn hội nhập sâu",
      milestone: {
        label: "Mốc lịch sử cố định",
        title: "Việt Nam gia nhập WTO",
        text: "Ngày 11/1/2007, Việt Nam trở thành thành viên WTO. Cơ hội thị trường mở rộng đồng thời sức ép cạnh tranh trở nên trực tiếp hơn.",
        sourceIds: ["wto_vietnam", "session27_5", "session29_7"]
      },
      briefing: {
        objective: "Chuyển độ mở thị trường thành giá trị nội địa, năng lực cạnh tranh và vị trí cao hơn trong chuỗi giá trị.",
        points: [
          {
            label: "Thành tựu",
            title: "Thị trường mở rộng mạnh",
            text: "Xuất khẩu, đầu tư và liên kết kinh tế quốc tế tạo thêm động lực cho sản xuất."
          },
          {
            label: "Sức ép",
            title: "Cạnh tranh trở nên trực tiếp",
            text: "Doanh nghiệp phải thực thi cam kết và đáp ứng chuẩn mực ngay trên thị trường trong nước."
          },
          {
            label: "Giới hạn",
            title: "Giá trị nội địa còn mỏng",
            text: "Công nghiệp hỗ trợ và vị trí trong chuỗi chưa tăng tương xứng với độ mở."
          }
        ],
        causal: [
          "WTO → thị trường và cạnh tranh cùng mở rộng",
          "Nâng chuẩn → doanh nghiệp giữ được thị trường",
          "Liên kết nội địa → độ mở chuyển thành tự chủ"
        ],
        remember: "Hội nhập không tự động tạo hiện đại hóa; năng lực cạnh tranh quyết định phần giá trị giữ lại."
      },
      advisors: [
        {
          id: "hn-thi-truong",
          name: "Đỗ Quốc Huy",
          role: "Cố vấn thương mại",
          icon: "port",
          x: 19,
          y: 67,
          stance: "Cơ hội thị trường phải được khai thác khi cam kết đã có hiệu lực.",
          insight: "Tăng xuất khẩu nhanh có thể giữ nền kinh tế ở khâu gia công nếu thiếu nâng chất.",
          sourceIds: ["session27_5", "session29_7", "wto_vietnam"]
        },
        {
          id: "hn-lien-ket",
          name: "Ngô Thanh Sơn",
          role: "Cố vấn chuỗi giá trị",
          icon: "chain",
          x: 50,
          y: 62,
          stance: "Độ mở chỉ thành tự chủ khi doanh nghiệp nội địa tham gia sâu.",
          insight: "Công nghiệp hỗ trợ tạo hiệu ứng lan tỏa, nhưng cần thời gian để đạt chuẩn chuỗi.",
          sourceIds: ["session29_9", "session29_10", "resolution29"]
        },
        {
          id: "hn-tieu-chuan",
          name: "Bùi Ánh Dương",
          role: "Cố vấn tiêu chuẩn",
          icon: "check",
          x: 80,
          y: 68,
          stance: "Cạnh tranh dài hạn nằm ở công nghệ, chất lượng và chuẩn mực.",
          insight: "Nâng chuẩn tạo chi phí ngắn hạn lớn, đặc biệt với doanh nghiệp nhỏ.",
          sourceIds: ["session29_8", "session29_9", "resolution29"]
        }
      ],
      dilemmas: [
        {
          id: "hn-01",
          prompt: "Sau WTO, chiến lược nào biến độ mở thành năng lực tự chủ?",
          context: "Xuất khẩu tăng nhanh, nhưng giá trị nội địa và công nghiệp hỗ trợ chưa theo kịp.",
          sourceIds: ["wto_vietnam", "session27_5", "session29_7", "session29_9", "session29_10"],
          choices: [
            {
              id: "hn-open-with-linkage",
              advisorId: "hn-lien-ket",
              tag: "Lan tỏa nội địa",
              title: "Mở cửa gắn nội lực",
              summary: "Thực thi cam kết, phát triển công nghiệp hỗ trợ và kết nối doanh nghiệp nội địa.",
              effects: { structure: 5, technology: 6, integration: 7, autonomy: 8, sustainability: 2 },
              outcome: "Thị trường bên ngoài kéo năng lực trong nước đi lên; tốc độ không cực đại nhưng giá trị giữ lại cao hơn.",
              verdict: "recommended",
              verdictLabel: "Phù hợp nhất",
              rationale: "Phương án giải quyết đúng khoảng cách giữa độ mở cao và liên kết nội địa còn mỏng của giai đoạn.",
              worldChange: "Cảng nối với mạng nhà cung ứng trong nước; linh kiện di chuyển giữa nhiều xưởng trước khi xuất khẩu."
            },
            {
              id: "hn-quality-first",
              advisorId: "hn-tieu-chuan",
              tag: "Nâng chất cạnh tranh",
              title: "Nâng chuẩn trước",
              summary: "Ưu tiên công nghệ, chất lượng và môi trường trước khi tăng mạnh sản lượng.",
              effects: { structure: -2, technology: 7, integration: 4, autonomy: 4, sustainability: 7 },
              outcome: "Doanh nghiệp đạt nền tảng cạnh tranh bền hơn, nhưng chi phí thích nghi cao và cơ hội thị trường được khai thác chậm.",
              verdict: "conditional",
              verdictLabel: "Hợp lý có điều kiện",
              rationale: "Nâng chuẩn là đúng, nhưng cần lộ trình và hỗ trợ để không loại quá nhanh doanh nghiệp nhỏ khỏi thị trường.",
              worldChange: "Phòng kiểm định và dây chuyền sạch xuất hiện; một số xưởng nhỏ tạm tối đèn để nâng cấp."
            },
            {
              id: "hn-export-volume",
              advisorId: "hn-thi-truong",
              tag: "Tận dụng thị trường",
              title: "Xuất khẩu tăng tốc",
              summary: "Dùng lợi thế chi phí và đơn hàng lớn để mở rộng sản lượng thật nhanh.",
              effects: { structure: 7, technology: 2, integration: 9, autonomy: -7, sustainability: -4 },
              outcome: "Kim ngạch và quy mô tăng mạnh, nhưng giá trị nội địa mỏng làm nguy cơ gia công và phụ thuộc kéo dài.",
              verdict: "risky",
              verdictLabel: "Tăng nhanh, rủi ro cao",
              rationale: "Ngộ nhận nằm ở việc đồng nhất tăng xuất khẩu với tăng năng lực nội sinh và vị trí trong chuỗi giá trị.",
              worldChange: "Tàu hàng rời cảng liên tục; nhà máy lắp ráp mở rộng nhưng các mắt xích nội địa vẫn đứt đoạn."
            }
          ]
        }
      ],
      checkpoint: {
        question: "Hội nhập kinh tế quốc tế có tự động tạo tự chủ không?",
        options: [
          "Có, vì độ mở càng cao thì nội lực tự động càng mạnh.",
          "Không, hiệu quả còn phụ thuộc thể chế, cạnh tranh và khả năng doanh nghiệp nội địa tham gia chuỗi.",
          "Có, miễn là xuất khẩu tăng nhanh."
        ],
        answer: 1,
        explanation: "Hội nhập tạo cơ hội về thị trường và nguồn lực, đồng thời gây sức ép cạnh tranh và nguy cơ phụ thuộc.",
        sourceIds: ["session28_5", "session28_6", "session29_10"]
      },
      report: {
        achievement: "Thị trường, xuất khẩu và khả năng tiếp cận vốn–công nghệ quốc tế tăng mạnh.",
        limitation: "Giá trị nội địa và công nghiệp hỗ trợ chưa tăng tương xứng, làm nguy cơ gia công kéo dài.",
        thesis: "Độ mở chỉ chuyển thành tự chủ khi năng lực trong nước tham gia sâu vào chuỗi giá trị."
      }
    },

    {
      id: "new-model",
      order: 3,
      number: "04",
      period: "2021–2026",
      title: "Đổi chất mô hình",
      kicker: "Từ tăng quy mô sang tri thức, giá trị cao và bền vững",
      accent: "#21816e",
      artwork: "./assets/era-04-doi-chat-2021-2026.jpg",
      artworkAlt: "Sản xuất hiện đại, công nghệ và năng lượng xanh Việt Nam giai đoạn 2021–2026",
      milestone: {
        label: "Mốc lịch sử cố định",
        title: "Nghị quyết 29-NQ/TW năm 2022",
        text: "Định hướng mới đặt khoa học–công nghệ, đổi mới sáng tạo, năng lực tự chủ, giá trị cao và phát triển xanh vào trung tâm.",
        sourceIds: ["resolution29", "session25_7", "session26_3"]
      },
      briefing: {
        objective: "Chuyển từ mở rộng quy mô sang làm chủ công nghệ, giá trị cao và phát triển bền vững.",
        points: [
          {
            label: "Yêu cầu mới",
            title: "Không thể chỉ tăng sản lượng",
            text: "Cạnh tranh chuyển sang công nghệ, thiết kế, quản trị và khả năng đáp ứng tiêu chuẩn mới."
          },
          {
            label: "Cơ hội",
            title: "Rút ngắn bằng công nghệ mới",
            text: "Hiện đại hóa sản xuất và quản trị có thể tạo bước nhảy nếu gắn với đổi mới cơ cấu."
          },
          {
            label: "Thách thức",
            title: "Tự chủ và xanh cùng lúc",
            text: "Mua giải pháp chưa đồng nghĩa làm chủ; chuyển đổi xanh còn tạo chi phí ngắn hạn lớn."
          }
        ],
        causal: [
          "Nghiên cứu–thiết kế → giá trị cao và tự chủ",
          "Công nghệ gắn quản trị → hiện đại hóa thực chất",
          "Hiệu quả tài nguyên → năng lực cạnh tranh dài hạn"
        ],
        remember: "CNH–HĐH hiện đại là chuyển đổi toàn diện, không phải chỉ phủ thêm thiết bị số."
      },
      advisors: [
        {
          id: "mh-nang-luc-loi",
          name: "Tiến sĩ Hải Nam",
          role: "Cố vấn năng lực lõi",
          icon: "spark",
          x: 19,
          y: 68,
          stance: "Giá trị cao đến từ khả năng nghiên cứu, thiết kế và tổ chức sản xuất.",
          insight: "Đầu tư năng lực lõi hoàn vốn chậm, nhưng tạo khả năng làm chủ dài hạn.",
          sourceIds: ["session25_7", "resolution29"]
        },
        {
          id: "mh-hien-dai-hoa",
          name: "Kiến trúc sư Thu Vân",
          role: "Cố vấn hiện đại hóa",
          icon: "chip",
          x: 50,
          y: 62,
          stance: "Công nghệ mới cần đi cùng đổi quy trình và quản trị.",
          insight: "Phủ công nghệ lên quy trình cũ có thể chỉ làm điểm nghẽn vận hành nhanh hơn.",
          sourceIds: ["session26_3", "resolution29"]
        },
        {
          id: "mh-xanh",
          name: "Nguyễn Diệp Chi",
          role: "Cố vấn công nghiệp xanh",
          icon: "leaf",
          x: 80,
          y: 69,
          stance: "Tiêu chuẩn xanh đang trở thành điều kiện cạnh tranh của thị trường.",
          insight: "Đi trước tạo lợi thế dài hạn, nhưng chi phí chuyển đổi ngắn hạn rất lớn.",
          sourceIds: ["resolution29", "green_growth_1658"]
        }
      ],
      dilemmas: [
        {
          id: "mh-01",
          prompt: "Ưu tiên nào giúp Việt Nam thực sự đổi chất mô hình?",
          context: "Giá trị nội địa còn hạn chế, trong khi công nghệ và chuẩn xanh thay đổi nhanh.",
          sourceIds: ["session25_7", "session26_3", "resolution29", "green_growth_1658"],
          choices: [
            {
              id: "mh-core-capability",
              advisorId: "mh-nang-luc-loi",
              tag: "Giá trị cao",
              title: "Làm chủ giá trị cao",
              summary: "Tập trung nghiên cứu, thiết kế và năng lực tổ chức sản xuất trong nước.",
              effects: { structure: 4, technology: 9, integration: 4, autonomy: 9, sustainability: 8 },
              outcome: "Năng lực nội sinh và vị trí trong chuỗi tăng rõ; kết quả chậm nhưng tạo nền cho hiện đại hóa dài hạn.",
              verdict: "recommended",
              verdictLabel: "Phù hợp nhất",
              rationale: "Chuyển từ gia công sang nghiên cứu, thiết kế và làm chủ công nghệ đáp ứng trực tiếp yêu cầu đổi chất mô hình.",
              worldChange: "Trung tâm thiết kế sáng lên cạnh nhà máy; sản phẩm hoàn chỉnh mang dấu ấn nghiên cứu trong nước."
            },
            {
              id: "mh-green-lead",
              advisorId: "mh-xanh",
              tag: "Lợi thế dài hạn",
              title: "Xanh hóa đi trước",
              summary: "Đầu tư sớm vào hiệu quả tài nguyên và chuỗi giá trị carbon thấp.",
              effects: { structure: -3, technology: 5, integration: 5, autonomy: 3, sustainability: 10 },
              outcome: "Tiêu chuẩn và vị thế thị trường tăng mạnh, nhưng chi phí cao có thể làm chậm mở rộng sản xuất ngắn hạn.",
              verdict: "conditional",
              verdictLabel: "Hợp lý có điều kiện",
              rationale: "Chuyển đổi xanh là tất yếu, nhưng phải đi cùng năng lực công nghệ và lộ trình tài chính phù hợp.",
              worldChange: "Mái nhà máy phủ năng lượng sạch, dòng sông trong hơn; một số dây chuyền tạm dừng để nâng cấp."
            },
            {
              id: "mh-digital-coverage",
              advisorId: "mh-hien-dai-hoa",
              tag: "Tăng tốc vận hành",
              title: "Phủ số hóa diện rộng",
              summary: "Mua nhanh nền tảng và thiết bị để số hóa đồng loạt các nhà máy.",
              effects: { structure: 8, technology: 8, integration: 3, autonomy: -6, sustainability: 0 },
              outcome: "Vận hành tăng tốc và hình ảnh hiện đại rõ rệt, nhưng quy trình cũ cùng phụ thuộc giải pháp ngoài vẫn tồn tại.",
              verdict: "risky",
              verdictLabel: "Nhanh nhưng chưa sâu",
              rationale: "Ngộ nhận thường gặp là đồng nhất số hóa thiết bị với chuyển đổi toàn diện về cơ cấu, quản trị và năng lực làm chủ.",
              worldChange: "Màn hình số phủ kín dây chuyền; nhịp máy tăng nhanh nhưng trung tâm điều khiển vẫn phụ thuộc kết nối bên ngoài."
            }
          ]
        }
      ],
      checkpoint: {
        question: "Điểm cốt lõi của CNH–HĐH hiện đại là gì?",
        options: [
          "Chỉ tăng số lượng máy móc và quy mô nhà máy.",
          "Chỉ ưu tiên công nghiệp nặng để tích lũy nhanh.",
          "Kết hợp công nghệ, kinh tế tri thức, hội nhập chủ động, tự chủ, giá trị cao và bền vững."
        ],
        answer: 2,
        explanation: "Mô hình hiện đại là chuyển đổi toàn diện về công nghệ, cơ cấu và quản trị; không phải cơ giới hóa đơn thuần.",
        sourceIds: ["session25_7", "session26_3", "resolution29"]
      },
      report: {
        achievement: "Định hướng phát triển chuyển rõ từ tăng quy mô sang làm chủ công nghệ, giá trị cao và xanh.",
        limitation: "Khoảng cách giữa định hướng và năng lực thực thi vẫn đòi hỏi đầu tư dài hạn, có trọng tâm.",
        thesis: "Hiện đại hóa phải đồng thời dựa trên tri thức, nội lực và phát triển bền vững."
      }
    }
  ],

  endingProfiles: [
    {
      id: "balanced",
      title: "Hiện đại hóa cân bằng",
      eyebrow: "Hồ sơ 01",
      description: "Nguồn lực bên ngoài được chuyển hóa tương đối đồng đều thành công nghệ, nội lực và giá trị bền vững.",
      condition: "balanced"
    },
    {
      id: "dependent-speed",
      title: "Tăng tốc nhưng phụ thuộc",
      eyebrow: "Hồ sơ 02",
      description: "Thị trường và quy mô tăng nhanh hơn năng lực nội sinh; độ mở cao nhưng sức tự chủ còn mỏng.",
      condition: "integrationGap"
    },
    {
      id: "brown-industry",
      title: "Công nghiệp hóa nâu",
      eyebrow: "Hồ sơ 03",
      description: "Năng suất và công nghệ tăng nhưng giá trị bền vững tụt lại, làm chi phí chuyển đổi tương lai lớn hơn.",
      condition: "sustainabilityGap"
    },
    {
      id: "closed-autonomy",
      title: "Tự chủ nhưng khép kín",
      eyebrow: "Hồ sơ 04",
      description: "Nội lực được ưu tiên nhưng kết nối thị trường và nguồn lực quốc tế chưa đủ để tạo bước nhảy công nghệ.",
      condition: "integrationLow"
    },
    {
      id: "uneven",
      title: "Hiện đại hóa không đồng đều",
      eyebrow: "Hồ sơ 05",
      description: "Một vài trục tiến nhanh trong khi các điều kiện bổ trợ chưa theo kịp, khiến thành quả khó lan tỏa.",
      condition: "spread"
    }
  ],

  modelComparison: [
    {
      model: "Cổ điển",
      logic: "Khởi đầu từ công nghiệp nhẹ rồi tích lũy để phát triển công nghiệp nặng; tiến trình tuần tự và kéo dài.",
      note: "Tạo tích lũy qua thị trường nhưng có thể mất nhiều thập niên.",
      sourceId: "session24_16"
    },
    {
      model: "Kiểu Liên Xô",
      logic: "Tập trung nguồn lực, ưu tiên công nghiệp nặng để nhanh chóng xây dựng cơ sở vật chất – kỹ thuật.",
      note: "Tăng tốc ngành nền tảng nhưng dễ mất cân đối nếu phân bổ kém hiệu quả.",
      sourceId: "session24_17"
    },
    {
      model: "Nhật Bản và NICs",
      logic: "Tận dụng vốn, công nghệ, thị trường quốc tế và vai trò điều phối để rút ngắn quá trình công nghiệp hóa.",
      note: "Hiệu quả phụ thuộc khả năng hấp thụ và năng lực cạnh tranh trong nước.",
      sourceId: "session24_18"
    },
    {
      model: "Việt Nam hiện đại",
      logic: "Kết hợp kinh tế tri thức, thị trường định hướng XHCN, hội nhập chủ động, tự chủ và phát triển bền vững.",
      note: "Không sao chép một mô hình tuyến tính; trọng tâm là chất lượng và năng lực nội sinh.",
      sourceId: "session25_7"
    }
  ],

  audienceVote: {
    title: "Một ưu tiên cho chặng tiếp theo",
    prompt: "Nếu chỉ được dồn nguồn lực cho một điểm nghẽn, lớp sẽ chọn gì?",
    duration: 10,
    options: [
      {
        id: "vote-tech",
        label: "Nghiên cứu & công nghệ lõi",
        impact: "Tăng khả năng làm chủ, nhưng cần thời gian và nền tảng quản trị đủ mạnh.",
        lesson: "Giá trị cao đến từ năng lực hấp thụ, thiết kế và tổ chức sản xuất, không chỉ từ mua công nghệ."
      },
      {
        id: "vote-linkage",
        label: "Liên kết doanh nghiệp nội địa",
        impact: "Tăng lan tỏa từ hội nhập, nhưng kết quả chậm hơn mở rộng sản lượng trực tiếp.",
        lesson: "Độ mở chỉ chuyển thành tự chủ khi doanh nghiệp trong nước tham gia sâu vào chuỗi giá trị."
      },
      {
        id: "vote-green",
        label: "Chuyển đổi xanh",
        impact: "Nâng chuẩn dài hạn, nhưng tạo chi phí thích nghi lớn trong ngắn hạn.",
        lesson: "Hiện đại hóa ngày nay phải đồng thời hiệu quả về công nghệ, tài nguyên và môi trường."
      }
    ]
  },

  presentationStages: [
    {
      start: 0,
      end: 60,
      time: "00:00–01:00",
      member: "TV1",
      title: "Hook và cách chơi",
      instruction: "Giới thiệu vai trò điều phối; nhấn mạnh đây là mô phỏng định tính, không phải dự báo."
    },
    {
      start: 60,
      end: 330,
      time: "01:00–05:30",
      member: "TV1",
      title: "1986–1995",
      instruction: "Mời lớp chọn một cố vấn; chốt vai trò tiền đề của Đổi mới thể chế."
    },
    {
      start: 330,
      end: 600,
      time: "05:30–10:00",
      member: "TV2",
      title: "1996–2006",
      instruction: "Làm rõ nguồn lực ngoài chỉ hiệu quả khi năng lực trong nước hấp thụ được."
    },
    {
      start: 600,
      end: 870,
      time: "10:00–14:30",
      member: "TV3",
      title: "2007–2020",
      instruction: "Đặt câu hỏi: WTO có tự động tạo hiện đại hóa và tự chủ không?"
    },
    {
      start: 870,
      end: 1140,
      time: "14:30–19:00",
      member: "TV4",
      title: "2021–2026",
      instruction: "Chốt chuyển từ tăng quy mô sang tri thức, tự chủ, giá trị cao và xanh."
    },
    {
      start: 1140,
      end: 1230,
      time: "19:00–20:30",
      member: "TV2–TV3",
      title: "So sánh mô hình và hồ sơ cuối",
      instruction: "Phân biệt cổ điển, Liên Xô, Nhật Bản/NICs và định hướng Việt Nam hiện đại."
    },
    {
      start: 1230,
      end: 1260,
      time: "20:30–21:00",
      member: "TV4",
      title: "Nguồn, AI Usage, kết luận",
      instruction: "Nêu nguồn kiểm chứng và khẳng định nhóm chịu trách nhiệm với nội dung cuối."
    },
    {
      start: 1260,
      end: 1500,
      time: "21:00–25:00",
      member: "BUFFER",
      title: "Dự phòng bốn phút",
      instruction: "Dùng cho biểu quyết, chuyển người, lỗi kỹ thuật hoặc phản hồi lớp; dừng tuyệt đối ở 25:00."
    }
  ],

  aiUsage: {
    title: "Minh bạch AI Usage",
    assisted: [
      "Hỗ trợ phác thảo cấu trúc tương tác, mô hình dữ liệu và ngôn ngữ giao diện.",
      "Hỗ trợ kiểm tra tính nhất quán giữa lựa chọn, hệ quả và nhịp trình chiếu.",
      "Không dùng AI làm nguồn học thuật và không để AI thay nhóm đưa ra kết luận."
    ],
    verified: [
      "Luận điểm được đối chiếu với bài giảng Session 24–29 và nguồn chính thống liệt kê trong game.",
      "Nhóm chịu trách nhiệm chọn luận điểm, biên tập, kiểm chứng và trình bày sản phẩm cuối.",
      "Các con số trên năm trục chỉ là bước mô phỏng tương đối, không phải dữ liệu kinh tế thực."
    ]
  },

  sources: {
    session24_14: {
      group: "Bài giảng",
      label: "Session 24 — slide 14",
      detail: "Khái niệm công nghiệp hóa và năng suất lao động xã hội."
    },
    session24_16: {
      group: "Bài giảng",
      label: "Session 24 — slide 16",
      detail: "Mô hình công nghiệp hóa cổ điển và thời gian thực hiện."
    },
    session24_17: {
      group: "Bài giảng",
      label: "Session 24 — slide 17",
      detail: "Mô hình công nghiệp hóa kiểu Liên Xô, ưu tiên công nghiệp nặng."
    },
    session24_18: {
      group: "Bài giảng",
      label: "Session 24 — phần mô hình",
      detail: "Mô hình công nghiệp hóa của Nhật Bản và các nước công nghiệp mới."
    },
    session25_6: {
      group: "Bài giảng",
      label: "Session 25 — slide 6",
      detail: "Khái niệm công nghiệp hóa, hiện đại hóa ở Việt Nam."
    },
    session25_7: {
      group: "Bài giảng",
      label: "Session 25 — slide 7",
      detail: "Đặc điểm CNH–HĐH trong kinh tế tri thức, thị trường và hội nhập."
    },
    session26_3: {
      group: "Bài giảng",
      label: "Session 26 — slide 3",
      detail: "Điều kiện sản xuất, khoa học–công nghệ, cơ cấu và quan hệ sản xuất."
    },
    session27_5: {
      group: "Bài giảng",
      label: "Session 27 — slide 5",
      detail: "Khái niệm hội nhập kinh tế quốc tế."
    },
    session27_8: {
      group: "Bài giảng",
      label: "Session 27 — slide 8",
      detail: "Hội nhập mở rộng thị trường, thu hút vốn và thúc đẩy CNH–HĐH."
    },
    session27_9: {
      group: "Bài giảng",
      label: "Session 27 — slide 9",
      detail: "Chuẩn bị điều kiện, phương thức và lộ trình hội nhập phù hợp."
    },
    session28_5: {
      group: "Bài giảng",
      label: "Session 28 — slide 5",
      detail: "Tác động tích cực của hội nhập đối với thị trường, công nghệ, vốn và cơ cấu."
    },
    session28_6: {
      group: "Bài giảng",
      label: "Session 28 — slide 6",
      detail: "Sức ép cạnh tranh, phụ thuộc và phân phối lợi ích không đồng đều."
    },
    session29_7: {
      group: "Bài giảng",
      label: "Session 29 — slide 7",
      detail: "Chủ động tham gia liên kết và thực hiện đầy đủ các cam kết quốc tế."
    },
    session29_8: {
      group: "Bài giảng",
      label: "Session 29 — slide 8",
      detail: "Hoàn thiện thể chế, cơ chế quản lý và pháp luật phục vụ hội nhập."
    },
    session29_9: {
      group: "Bài giảng",
      label: "Session 29 — slide 9",
      detail: "Nâng cao năng lực cạnh tranh quốc tế của nền kinh tế."
    },
    session29_10: {
      group: "Bài giảng",
      label: "Session 29 — slide 10",
      detail: "Xây dựng nền kinh tế độc lập, tự chủ, không bị áp đặt hoặc khống chế."
    },
    moit_1986_2006: {
      group: "Nguồn chính thống",
      label: "Bộ Công Thương — Giai đoạn 1986–2006",
      detail: "Đổi mới cơ chế kinh tế, phát triển công nghiệp và các mốc hội nhập.",
      url: "https://moit.gov.vn/gioi-thieu/cac-thoi-ky-phat-trien/giai-doan-1986-2006.html"
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
    },
    green_growth_1658: {
      group: "Nguồn chính thống",
      label: "Quyết định 1658/QĐ-TTg (2021)",
      detail: "Chiến lược quốc gia về tăng trưởng xanh giai đoạn 2021–2030, tầm nhìn 2050.",
      url: "https://congbao.chinhphu.vn/van-ban/quyet-dinh-so-1658-qd-ttg-34550.htm"
    }
  }
};
