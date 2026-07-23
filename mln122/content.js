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
      knowledge: {
        title: "CNH–HĐH và vai trò tiền đề của Đổi mới thể chế",
        concepts: [
          {
            term: "Công nghiệp hóa",
            definition: "Quá trình chuyển đổi căn bản, toàn diện các hoạt động sản xuất kinh doanh, dịch vụ và quản lý kinh tế – xã hội từ sử dụng sức lao động thủ công là chính sang sử dụng phương tiện, phương pháp tiên tiến, hiện đại nhằm tạo ra năng suất lao động xã hội cao.",
            sourceId: "session24_14"
          },
          {
            term: "Hiện đại hóa",
            definition: "Quá trình ứng dụng và trang bị những thành tựu khoa học và công nghệ tiên tiến, hiện đại vào mọi lĩnh vực của đời sống xã hội.",
            sourceId: "session25_6"
          },
          {
            term: "Quan hệ sản xuất phù hợp",
            definition: "Khi cơ chế phân bổ nguồn lực, hình thức sở hữu và quản lý được đổi mới đồng bộ, tạo động lực để lực lượng sản xuất phát triển.",
            sourceId: "session26_3"
          }
        ],
        context: "Trước 1986, cơ chế kế hoạch hóa tập trung bao cấp kéo dài khiến sản xuất trì trệ, lạm phát phi mã, hàng hóa khan hiếm. Đại hội VI (12/1986) đề ra đường lối Đổi mới, chuyển sang kinh tế hàng hóa nhiều thành phần, tháo gỡ cơ chế cũ và mở đường cho CNH–HĐH.",
        thesis: "Đổi mới thể chế kinh tế là tiền đề của CNH–HĐH: chỉ khi quan hệ sản xuất được điều chỉnh phù hợp thì lực lượng sản xuất mới được giải phóng và phát huy.",
        sourceIds: ["session24_14", "session25_6", "session26_3", "moit_1986_2006"]
      },
      briefing: {
        objective: "Khơi thông nguồn lực, phục hồi sản xuất và chuẩn bị năng lực cho mở cửa.",
        points: [
          {
            label: "Điểm xuất phát",
            title: "Cơ chế cũ tạo điểm nghẽn",
            text: "Phân bổ hành chính kéo dài làm sản xuất thiếu động lực, nguồn lực khó lưu chuyển."
          },
          {
            label: "Bước ngoặt",
            title: "Đổi mới khơi thông nguồn lực",
            text: "Thể chế kinh tế được điều chỉnh để nhiều chủ thể phát huy năng lực sản xuất."
          },
          {
            label: "Thách thức",
            title: "Nội lực còn mỏng",
            text: "Hạ tầng, công nghệ và sức cạnh tranh chưa thể tăng ngay sau đổi mới thể chế."
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
          prompt: "Đầu Đổi mới, ưu tiên nào tạo nền CNH–HĐH?",
          context: "Cơ chế vừa mở; sản xuất thiếu vốn, sức cạnh tranh yếu.",
          sourceIds: ["session24_14", "session26_3", "session27_9", "moit_1986_2006"],
          choices: [
            {
              id: "dm-reform-balanced",
              advisorId: "dm-the-che",
              tag: "Thể chế làm nền",
              title: "Cải cách đồng bộ",
              summary: "Cải cách phân bổ, phục hồi sản xuất thiết yếu và mở cửa theo lộ trình.",
              effects: { structure: 5, technology: 2, integration: 3, autonomy: 5, sustainability: 1 },
              outcome: "Nguồn lực được giải phóng và hấp thụ tốt hơn; tốc độ tăng ban đầu vừa phải nhưng nền tảng cân bằng.",
              verdict: "recommended",
              verdictLabel: "Phù hợp nhất",
              rationale: "Bối cảnh điểm xuất phát thấp đòi hỏi thể chế đi trước để đầu tư và mở cửa chuyển thành năng lực thực.",
              worldChange: "Chợ và xưởng sáng đèn; giao thông mở dần, khu dân cư ổn định hơn."
            },
            {
              id: "dm-production-first",
              advisorId: "dm-san-xuat",
              tag: "Tạo lực kéo",
              title: "Sản xuất đi trước",
              summary: "Dồn vốn cho hạ tầng, máy móc và hàng hóa thiết yếu để phục hồi nhanh.",
              effects: { structure: 7, technology: 4, integration: 0, autonomy: 2, sustainability: -3 },
              outcome: "Sản lượng, hạ tầng tăng rõ; đầu tư dễ dàn trải khi cơ chế điều phối chưa theo kịp.",
              verdict: "conditional",
              verdictLabel: "Hợp lý có điều kiện",
              rationale: "Phục hồi sản xuất là cần thiết, nhưng chỉ hiệu quả bền khi cách phân bổ nguồn lực đồng thời được đổi mới.",
              worldChange: "Nhà máy và đường mới xuất hiện; khói bụi, công trình dang dở cũng tăng."
            },
            {
              id: "dm-open-fast",
              advisorId: "dm-hoi-nhap",
              tag: "Đón nguồn lực ngoài",
              title: "Mở cửa thật nhanh",
              summary: "Ưu tiên thị trường, vốn và công nghệ bên ngoài để rút ngắn quá trình.",
              effects: { structure: 3, technology: 3, integration: 8, autonomy: -6, sustainability: -1 },
              outcome: "Giao thương tăng nhanh; doanh nghiệp nội địa chịu sức ép lớn và nguy cơ lệ thuộc tăng.",
              verdict: "risky",
              verdictLabel: "Tăng nhanh, rủi ro cao",
              rationale: "Ngộ nhận thường gặp là mở cửa tự động tạo hiện đại hóa; hiệu quả còn phụ thuộc năng lực hấp thụ trong nước.",
              worldChange: "Cảng đông lên, biển hiệu ngoại xuất hiện; nhiều xưởng nhỏ tối đèn."
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
      knowledge: {
        title: "Nội dung CNH–HĐH và năng lực hấp thụ nguồn lực",
        concepts: [
          {
            term: "Nội dung CNH–HĐH",
            definition: "Tạo lập các điều kiện, tiền đề cần thiết về con người, khoa học–công nghệ, cơ sở vật chất kỹ thuật, cơ cấu kinh tế và quan hệ sản xuất phù hợp để chuyển đổi căn bản nền sản xuất xã hội.",
            sourceId: "session26_3"
          },
          {
            term: "Lực lượng sản xuất",
            definition: "Bao gồm tư liệu sản xuất (công cụ, đối tượng lao động) và người lao động với tri thức, kỹ năng của họ; CNH–HĐH hướng tới phát triển đồng bộ cả hai yếu tố này.",
            sourceId: "session26_3"
          },
          {
            term: "Năng lực hấp thụ",
            definition: "Khả năng tiếp nhận, chuyển hóa và phát huy hiệu quả nguồn vốn, công nghệ, phương thức quản lý từ bên ngoài thành năng lực sản xuất thực sự trong nước.",
            sourceId: "session27_9"
          }
        ],
        context: "Từ 1996, Việt Nam bước vào giai đoạn đẩy mạnh CNH–HĐH: khu công nghiệp mở rộng, FDI gia tăng, hạ tầng logistics phát triển. Tuy nhiên, doanh nghiệp nội địa vẫn khó tham gia sâu vào chuỗi cung ứng do công nghệ và quản trị chưa đáp ứng.",
        thesis: "Nguồn lực bên ngoài (vốn, công nghệ, thị trường) chỉ phát huy hiệu quả bền vững khi được chuyển hóa bằng năng lực hấp thụ bên trong — bao gồm thể chế, nhân lực và liên kết doanh nghiệp nội địa.",
        sourceIds: ["session25_6", "session25_7", "session26_3", "session27_8", "session27_9"]
      },
      briefing: {
        objective: "Kết hợp hạ tầng, vốn–công nghệ ngoài và doanh nghiệp nội địa để nâng năng lực hấp thụ.",
        points: [
          {
            label: "Động lực",
            title: "Hạ tầng mở rộng",
            text: "Khu công nghiệp, logistics và dòng vốn mới nâng nhanh năng lực sản xuất."
          },
          {
            label: "Cơ hội",
            title: "Tiếp cận vốn, công nghệ",
            text: "Hội nhập bổ sung nguồn lực mà tích lũy trong nước chưa đáp ứng đủ."
          },
          {
            label: "Điểm nghẽn",
            title: "Hấp thụ còn yếu",
            text: "Doanh nghiệp nội địa khó nhận công nghệ và tham gia sâu chuỗi cung ứng."
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
          prompt: "Làm sao biến nguồn lực ngoài thành nội lực?",
          context: "Đầu tư và khu công nghiệp tăng, nhưng doanh nghiệp nội địa khó tham gia chuỗi.",
          sourceIds: ["session25_6", "session27_8", "session28_5", "session29_9"],
          choices: [
            {
              id: "tt-absorption-linkage",
              advisorId: "tt-noi-luc",
              tag: "Năng lực hấp thụ",
              title: "Liên kết để hấp thụ",
              summary: "Gắn dự án đầu tư với nhà cung ứng nội địa, quản trị và chuyển giao công nghệ.",
              effects: { structure: 4, technology: 7, integration: 5, autonomy: 7, sustainability: 2 },
              outcome: "Quy mô tăng vừa phải; công nghệ lan tỏa tốt hơn, doanh nghiệp nội địa tham gia sâu hơn.",
              verdict: "recommended",
              verdictLabel: "Phù hợp nhất",
              rationale: "Chiến lược này kết hợp nguồn lực quốc tế với năng lực cạnh tranh trong nước, đúng điểm nghẽn của giai đoạn.",
              worldChange: "Nhà máy lớn nối mạng xưởng vệ tinh; logistics liền mạch thay cho các cụm tách biệt."
            },
            {
              id: "tt-infrastructure-push",
              advisorId: "tt-ha-tang",
              tag: "Tạo lực kéo",
              title: "Dồn lực hạ tầng",
              summary: "Ưu tiên đường, cảng và khu công nghiệp trọng điểm để tăng năng lực nhanh.",
              effects: { structure: 8, technology: 3, integration: 0, autonomy: 8, sustainability: -4 },
              outcome: "Sản xuất, logistics tăng mạnh; hiệu quả lan tỏa vẫn phụ thuộc năng lực quản trị đầu tư.",
              verdict: "conditional",
              verdictLabel: "Hợp lý có điều kiện",
              rationale: "Hạ tầng là điều kiện cần, nhưng chưa đủ nếu doanh nghiệp nội địa không được nâng sức và kết nối.",
              worldChange: "Cảng, cầu và khu công nghiệp mọc nhanh; chênh lệch phát triển giữa các vùng rõ hơn."
            },
            {
              id: "tt-fdi-volume",
              advisorId: "tt-dau-tu",
              tag: "Tăng quy mô",
              title: "Ưu đãi đầu tư đại trà",
              summary: "Giảm điều kiện để thu hút thật nhiều vốn, nhà máy và đơn hàng xuất khẩu.",
              effects: { structure: 5, technology: 5, integration: 8, autonomy: -7, sustainability: -3 },
              outcome: "Nhà máy, xuất khẩu tăng nhanh; giá trị nội địa thấp và nguy cơ hình thành ốc đảo sản xuất.",
              verdict: "risky",
              verdictLabel: "Tăng nhanh, rủi ro cao",
              rationale: "Quy mô đầu tư không tự động tạo chuyển giao; thiếu điều kiện liên kết làm độ mở tăng nhanh hơn nội lực.",
              worldChange: "Nhà máy lớn sáng đèn cạnh cảng; khu doanh nghiệp nội địa vẫn thưa và ít kết nối."
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
      knowledge: {
        title: "Hội nhập kinh tế quốc tế và tự chủ trong CNH–HĐH",
        concepts: [
          {
            term: "Hội nhập kinh tế quốc tế",
            definition: "Quá trình quốc gia thực hiện mở cửa, tham gia các tổ chức kinh tế quốc tế, thực hiện tự do hóa thương mại và đầu tư theo các cam kết song phương và đa phương.",
            sourceId: "session27_5"
          },
          {
            term: "Tác động tích cực",
            definition: "Mở rộng thị trường, thu hút vốn–công nghệ, thúc đẩy chuyển dịch cơ cấu kinh tế, tạo động lực cải cách thể chế và nâng cao năng lực cạnh tranh.",
            sourceId: "session28_5"
          },
          {
            term: "Tác động tiêu cực",
            definition: "Gia tăng sức ép cạnh tranh, nguy cơ phụ thuộc kinh tế, phân phối lợi ích không đồng đều, thách thức chủ quyền kinh tế quốc gia.",
            sourceId: "session28_6"
          }
        ],
        context: "Gia nhập WTO (1/2007) mở ra thị trường rộng lớn nhưng cũng đặt doanh nghiệp Việt Nam vào cạnh tranh trực tiếp toàn cầu. Xuất khẩu tăng nhanh song tỷ trọng gia công vẫn lớn, công nghiệp hỗ trợ và giá trị nội địa chưa theo kịp.",
        thesis: "Hội nhập không tự động tạo hiện đại hóa hay tự chủ; hiệu quả phụ thuộc vào thể chế, năng lực cạnh tranh và mức độ doanh nghiệp nội địa tham gia sâu vào chuỗi giá trị.",
        sourceIds: ["session27_5", "session28_5", "session28_6", "session29_7", "session29_9", "session29_10"]
      },
      briefing: {
        objective: "Biến độ mở thành giá trị nội địa, sức cạnh tranh và vị trí cao hơn trong chuỗi.",
        points: [
          {
            label: "Thành tựu",
            title: "Thị trường mở rộng",
            text: "Xuất khẩu, đầu tư và liên kết quốc tế tạo thêm động lực sản xuất."
          },
          {
            label: "Sức ép",
            title: "Cạnh tranh trực tiếp",
            text: "Doanh nghiệp phải thực thi cam kết, đáp ứng chuẩn mực ngay trong nước."
          },
          {
            label: "Giới hạn",
            title: "Giá trị nội địa mỏng",
            text: "Công nghiệp hỗ trợ và vị trí trong chuỗi chưa tăng tương xứng độ mở."
          }
        ],
        causal: [
          "WTO → thị trường và cạnh tranh cùng mở rộng",
          "Nâng chuẩn → doanh nghiệp giữ được thị trường",
          "Liên kết nội địa → độ mở chuyển thành tự chủ"
        ],
        remember: "Độ mở không tự tạo hiện đại hóa; năng lực cạnh tranh quyết định giá trị giữ lại."
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
          prompt: "Sau WTO, làm sao biến độ mở thành tự chủ?",
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
              outcome: "Thị trường ngoài kéo năng lực trong nước đi lên; tốc độ vừa phải nhưng giá trị giữ lại cao hơn.",
              verdict: "recommended",
              verdictLabel: "Phù hợp nhất",
              rationale: "Phương án giải quyết đúng khoảng cách giữa độ mở cao và liên kết nội địa còn mỏng của giai đoạn.",
              worldChange: "Cảng nối mạng nhà cung ứng nội địa; linh kiện qua nhiều xưởng trước khi xuất khẩu."
            },
            {
              id: "hn-quality-first",
              advisorId: "hn-tieu-chuan",
              tag: "Nâng chất cạnh tranh",
              title: "Nâng chuẩn trước",
              summary: "Ưu tiên công nghệ, chất lượng và môi trường trước khi tăng mạnh sản lượng.",
              effects: { structure: -2, technology: 7, integration: 4, autonomy: 4, sustainability: 7 },
              outcome: "Nền tảng cạnh tranh bền hơn; chi phí thích nghi cao làm cơ hội thị trường được khai thác chậm.",
              verdict: "conditional",
              verdictLabel: "Hợp lý có điều kiện",
              rationale: "Nâng chuẩn là đúng, nhưng cần lộ trình và hỗ trợ để không loại quá nhanh doanh nghiệp nhỏ khỏi thị trường.",
              worldChange: "Phòng kiểm định, dây chuyền sạch xuất hiện; một số xưởng tạm dừng để nâng cấp."
            },
            {
              id: "hn-export-volume",
              advisorId: "hn-thi-truong",
              tag: "Tận dụng thị trường",
              title: "Xuất khẩu tăng tốc",
              summary: "Dùng lợi thế chi phí và đơn hàng lớn để mở rộng sản lượng thật nhanh.",
              effects: { structure: 7, technology: 2, integration: 9, autonomy: -7, sustainability: -4 },
              outcome: "Kim ngạch, quy mô tăng mạnh; giá trị nội địa mỏng làm gia công và phụ thuộc kéo dài.",
              verdict: "risky",
              verdictLabel: "Tăng nhanh, rủi ro cao",
              rationale: "Ngộ nhận nằm ở việc đồng nhất tăng xuất khẩu với tăng năng lực nội sinh và vị trí trong chuỗi giá trị.",
              worldChange: "Tàu hàng rời cảng liên tục; lắp ráp mở rộng nhưng mắt xích nội địa còn đứt đoạn."
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
      knowledge: {
        title: "Mô hình CNH–HĐH kiểu mới: Tri thức, tự chủ và bền vững",
        concepts: [
          {
            term: "CNH–HĐH kiểu mới",
            definition: "Dựa trên nền tảng khoa học–công nghệ và đổi mới sáng tạo; gắn với kinh tế tri thức, chuyển đổi số, phát triển kinh tế xanh, kinh tế tuần hoàn và phát triển bền vững.",
            sourceId: "session25_7"
          },
          {
            term: "So sánh: CNH truyền thống vs hiện đại",
            definition: "Truyền thống: tuần tự, dựa vào tài nguyên, ưu tiên sản lượng. Hiện đại: rút ngắn, dựa vào tri thức–công nghệ, ưu tiên giá trị cao, tự chủ và bền vững.",
            sourceId: "session25_7"
          },
          {
            term: "Nghị quyết 29-NQ/TW (2022)",
            definition: "Định hướng CNH–HĐH đến 2030 tầm nhìn 2045: lấy khoa học–công nghệ, đổi mới sáng tạo và nguồn nhân lực chất lượng cao làm động lực; ưu tiên tự chủ công nghệ, giá trị gia tăng cao và phát triển xanh.",
            sourceId: "resolution29"
          }
        ],
        context: "Từ 2021, Việt Nam đối mặt yêu cầu chuyển đổi mô hình: cạnh tranh toàn cầu không còn chỉ dựa vào chi phí thấp mà dịch chuyển sang công nghệ, thiết kế, quản trị và tiêu chuẩn xanh. Nghị quyết 29-NQ/TW đánh dấu bước ngoặt chiến lược.",
        thesis: "CNH–HĐH hiện đại không phải phủ thêm thiết bị số lên quy trình cũ, mà là chuyển đổi toàn diện dựa trên tri thức, năng lực tự chủ công nghệ, giá trị cao và phát triển bền vững.",
        sourceIds: ["session25_7", "session26_3", "resolution29", "green_growth_1658"]
      },
      briefing: {
        objective: "Chuyển từ tăng quy mô sang làm chủ công nghệ, giá trị cao và phát triển xanh.",
        points: [
          {
            label: "Yêu cầu mới",
            title: "Không chỉ tăng sản lượng",
            text: "Cạnh tranh chuyển sang công nghệ, thiết kế, quản trị và tiêu chuẩn mới."
          },
          {
            label: "Cơ hội",
            title: "Rút ngắn bằng công nghệ",
            text: "Hiện đại hóa sản xuất, quản trị có thể tạo bước nhảy khi gắn với đổi mới cơ cấu."
          },
          {
            label: "Thách thức",
            title: "Tự chủ và xanh",
            text: "Mua giải pháp chưa phải làm chủ; chuyển đổi xanh còn tạo chi phí ngắn hạn."
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
          prompt: "Ưu tiên nào thực sự đổi chất mô hình?",
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
              outcome: "Năng lực nội sinh, vị trí trong chuỗi tăng; kết quả chậm nhưng tạo nền hiện đại hóa dài hạn.",
              verdict: "recommended",
              verdictLabel: "Phù hợp nhất",
              rationale: "Chuyển từ gia công sang nghiên cứu, thiết kế và làm chủ công nghệ đáp ứng trực tiếp yêu cầu đổi chất mô hình.",
              worldChange: "Trung tâm thiết kế sáng cạnh nhà máy; sản phẩm hoàn chỉnh mang dấu ấn nghiên cứu nội địa."
            },
            {
              id: "mh-green-lead",
              advisorId: "mh-xanh",
              tag: "Lợi thế dài hạn",
              title: "Xanh hóa đi trước",
              summary: "Đầu tư sớm vào hiệu quả tài nguyên và chuỗi giá trị carbon thấp.",
              effects: { structure: -3, technology: 5, integration: 5, autonomy: 3, sustainability: 10 },
              outcome: "Tiêu chuẩn, vị thế thị trường tăng; chi phí cao có thể làm chậm sản xuất ngắn hạn.",
              verdict: "conditional",
              verdictLabel: "Hợp lý có điều kiện",
              rationale: "Chuyển đổi xanh là tất yếu, nhưng phải đi cùng năng lực công nghệ và lộ trình tài chính phù hợp.",
              worldChange: "Nhà máy dùng năng lượng sạch, dòng sông trong hơn; một số dây chuyền dừng để nâng cấp."
            },
            {
              id: "mh-digital-coverage",
              advisorId: "mh-hien-dai-hoa",
              tag: "Tăng tốc vận hành",
              title: "Phủ số hóa diện rộng",
              summary: "Mua nền tảng và thiết bị để số hóa đồng loạt các nhà máy.",
              effects: { structure: 8, technology: 8, integration: 3, autonomy: -6, sustainability: 0 },
              outcome: "Vận hành tăng tốc, vẻ ngoài hiện đại; quy trình cũ và lệ thuộc giải pháp ngoại vẫn tồn tại.",
              verdict: "risky",
              verdictLabel: "Nhanh nhưng chưa sâu",
              rationale: "Ngộ nhận thường gặp là đồng nhất số hóa thiết bị với chuyển đổi toàn diện về cơ cấu, quản trị và năng lực làm chủ.",
              worldChange: "Màn hình số phủ dây chuyền; nhịp máy tăng nhưng điều khiển vẫn phụ thuộc kết nối ngoài."
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
      "Điểm số trên ba trụ cột chỉ là mô phỏng tương đối, không phải dữ liệu kinh tế thực."
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
